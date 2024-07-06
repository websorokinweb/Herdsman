export default function addStyles(): void {
	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)
}