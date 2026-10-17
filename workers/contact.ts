type Env = {
    ALLOWED_ORIGIN: string
    CONTACT_FROM_EMAIL: string
    CONTACT_TO_EMAIL: string
    RESEND_API_KEY: string
}

type ContactSubmission = {
    email?: unknown
    firstName?: unknown
    lastName?: unknown
    message?: unknown
    phone?: unknown
    website?: unknown
}

type ContactMessage = {
    email: string
    firstName: string
    lastName: string
    message: string
    phone: string
}

const contactPath = '/api/contact'

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get('Origin')
        const corsHeaders = createCorsHeaders(origin, env.ALLOWED_ORIGIN)

        if (origin && origin !== env.ALLOWED_ORIGIN) {
            return json({ error: 'Origin is not allowed.' }, 403)
        }

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders, status: 204 })
        }

        if (new URL(request.url).pathname !== contactPath) {
            return json({ error: 'Not found.' }, 404, corsHeaders)
        }

        if (request.method !== 'POST') {
            return json({ error: 'Method not allowed.' }, 405, { ...corsHeaders, Allow: 'POST, OPTIONS' })
        }

        let submission: ContactSubmission
        try {
            submission = await request.json() as ContactSubmission
        } catch {
            return json({ error: 'Invalid request body.' }, 400, corsHeaders)
        }

        // Bots commonly complete hidden fields; treat those requests as successfully handled.
        if (asText(submission.website)) {
            return json({ ok: true }, 202, corsHeaders)
        }

        const firstName = asText(submission.firstName, 80)
        const lastName = asText(submission.lastName, 80)
        const email = asText(submission.email, 254).toLowerCase()
        const phone = asText(submission.phone, 40)
        const message = asText(submission.message, 3_000)

        if (!firstName || !email || !phone || !isEmail(email)) {
            return json({ error: 'Please complete all required fields.' }, 400, corsHeaders)
        }

        if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL || !env.ALLOWED_ORIGIN) {
            return json({ error: 'The contact form is not configured yet.' }, 503, corsHeaders)
        }

        const senderName = [firstName, lastName].filter(Boolean).join(' ')
        const resendResponse = await fetch('https://api.resend.com/emails', {
            body: JSON.stringify({
                from: env.CONTACT_FROM_EMAIL,
                html: emailMarkup({ email, firstName, lastName, message, phone }),
                reply_to: email,
                subject: `New WIT contact message from ${senderName}`,
                text: emailText({ email, firstName, lastName, message, phone }),
                to: [env.CONTACT_TO_EMAIL],
            }),
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
                'User-Agent': 'wit-contact-worker/1.0',
            },
            method: 'POST',
        })

        if (!resendResponse.ok) {
            console.error('Resend rejected the contact form submission.', await resendResponse.text())
            return json({ error: 'Unable to send your message right now.' }, 502, corsHeaders)
        }

        return json({ ok: true }, 202, corsHeaders)
    },
}

function createCorsHeaders(origin: string | null, allowedOrigin: string): HeadersInit {
    if (!origin || origin !== allowedOrigin) {
        return { Vary: 'Origin' }
    }

    return {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Origin': allowedOrigin,
        Vary: 'Origin',
    }
}

function json(body: Record<string, boolean | string>, status: number, headers: HeadersInit = {}): Response {
    return new Response(JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...headers,
        },
        status,
    })
}

function asText(value: unknown, maximumLength = 0): string {
    if (typeof value !== 'string') {
        return ''
    }

    const trimmed = value.trim()
    return maximumLength ? trimmed.slice(0, maximumLength) : trimmed
}

function isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
    })[character] ?? character)
}

function emailMarkup(submission: ContactMessage): string {
    const field = (label: string, value: string) => `<p><strong>${label}</strong><br>${escapeHtml(value || 'Not provided')}</p>`

    return [
        '<h1>New Women in Tech contact message</h1>',
        field('Name', [submission.firstName, submission.lastName].filter(Boolean).join(' ')),
        field('Email', submission.email),
        field('Phone', submission.phone),
        field('Message', submission.message),
    ].join('')
}

function emailText(submission: ContactMessage): string {
    return [
        'New Women in Tech contact message',
        '',
        `Name: ${[submission.firstName, submission.lastName].filter(Boolean).join(' ')}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `Message: ${submission.message || 'Not provided'}`,
    ].join('\n')
}
