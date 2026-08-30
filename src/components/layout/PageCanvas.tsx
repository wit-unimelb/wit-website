import './PageCanvas.css'
type PageCanvasProps = {
    page: string
}

export default function PageCanvas({ page }: PageCanvasProps) {
    return <div className="page-canvas" data-page={page} aria-hidden="true" />
}
