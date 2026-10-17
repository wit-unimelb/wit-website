const assetBaseUrl = (import.meta.env.VITE_ASSET_BASE_URL ?? '').trim().replace(/\/+$/, '')

export function assetUrl(path: string) {
    const assetPath = path.trim().replace(/^\/+/, '')

    return assetBaseUrl && assetPath ? `${assetBaseUrl}/${assetPath}` : ''
}
