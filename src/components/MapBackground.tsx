type Theme = 'cream' | 'light' | 'dark' | 'paper'

const PALETTES: Record<Theme, { bg: string; road: string; park: string; water: string; block: string }> = {
	cream: { bg: '#e9e0cf', road: '#f6efe1', park: '#c8d6b0', water: '#b6ceda', block: '#ddd1bc' },
	light: { bg: '#f1eee7', road: '#ffffff', park: '#d7e3c7', water: '#c8dce6', block: '#e5dfd1' },
	dark: { bg: '#0d0d12', road: '#1a1a22', park: '#1c2a1f', water: '#152027', block: '#141420' },
	paper: { bg: '#f7f3ea', road: '#fff', park: '#d9e3c9', water: '#c4d7e0', block: '#ece4d3' },
}

type Props = {
	theme?: Theme
}

export function MapBackground({ theme = 'paper' }: Props) {
	const p = PALETTES[theme]
	return (
		<svg
			viewBox="0 0 400 600"
			preserveAspectRatio="xMidYMid slice"
			style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
		>
			<rect width="400" height="600" fill={p.bg} />
			{/* blocks */}
			<rect x="20" y="40" width="90" height="60" fill={p.block} rx="2" />
			<rect x="120" y="40" width="140" height="60" fill={p.block} rx="2" />
			<rect x="270" y="40" width="110" height="100" fill={p.block} rx="2" />
			<rect x="20" y="110" width="60" height="90" fill={p.block} rx="2" />
			<rect x="90" y="110" width="110" height="40" fill={p.block} rx="2" />
			<rect x="90" y="160" width="50" height="40" fill={p.block} rx="2" />
			<rect x="150" y="160" width="50" height="40" fill={p.block} rx="2" />
			<rect x="210" y="110" width="50" height="90" fill={p.block} rx="2" />
			<rect x="270" y="150" width="110" height="60" fill={p.block} rx="2" />
			<rect x="30" y="220" width="130" height="60" fill={p.block} rx="2" />
			<rect x="170" y="220" width="80" height="60" fill={p.block} rx="2" />
			<rect x="260" y="220" width="120" height="60" fill={p.block} rx="2" />
			<rect x="30" y="380" width="80" height="90" fill={p.block} rx="2" />
			<rect x="120" y="380" width="60" height="60" fill={p.block} rx="2" />
			<rect x="190" y="380" width="90" height="90" fill={p.block} rx="2" />
			<rect x="290" y="380" width="90" height="50" fill={p.block} rx="2" />
			<rect x="20" y="490" width="120" height="90" fill={p.block} rx="2" />
			<rect x="160" y="490" width="80" height="90" fill={p.block} rx="2" />
			<rect x="260" y="440" width="120" height="140" fill={p.block} rx="2" />
			{/* roads */}
			<rect x="0" y="100" width="400" height="10" fill={p.road} />
			<rect x="0" y="200" width="400" height="10" fill={p.road} />
			<rect x="0" y="290" width="400" height="10" fill={p.road} />
			<rect x="0" y="470" width="400" height="10" fill={p.road} />
			<rect x="110" y="0" width="10" height="600" fill={p.road} />
			<rect x="260" y="0" width="10" height="600" fill={p.road} />
			{/* park */}
			<rect x="30" y="300" width="220" height="70" fill={p.park} rx="8" />
			{/* river */}
			<path
				d="M 0 340 C 80 320, 150 380, 240 370 S 400 370, 400 390 L 400 430 C 320 420, 220 440, 140 420 S 40 420, 0 400 Z"
				fill={p.water}
				opacity="0.9"
			/>
		</svg>
	)
}
