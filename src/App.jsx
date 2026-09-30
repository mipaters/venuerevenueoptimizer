import { useEffect, useState } from 'react'
import './App.css'

const pages = [
  'Overview',
  'Live Optimization',
  'Fan Journey',
  'Revenue Impact',
  'Microsoft Cloud',
]

const heroStats = [
  { label: 'Total projected revenue', value: '$94.2M', delta: '+12.6%' },
  { label: 'Revenue opportunity pipeline', value: '$8.7M', delta: '+18.4%' },
  { label: 'Revenue at risk', value: '$2.1M', delta: '-6.8%' },
  { label: 'Revenue growth projection', value: '+17.3%', delta: 'vs. last quarter' },
]

const kpiCards = [
  { label: 'Revenue Growth', value: '+18.7%', trend: 'up' },
  { label: 'Per Capita Spend', value: '$47.80', trend: 'up' },
  { label: 'Sponsorship Revenue', value: '$6.4M', trend: 'up' },
  { label: 'Premium Seat Utilization', value: '74%', trend: 'up' },
  { label: 'Parking Revenue', value: '$2.1M', trend: 'up' },
  { label: 'Merchandise Revenue', value: '$3.8M', trend: 'up' },
  { label: 'Forecast Accuracy', value: '96.4%', trend: 'up' },
  { label: 'Average Revenue Per Attendee', value: '$241', trend: 'up' },
  { label: 'Revenue Opportunity Pipeline', value: '$8.7M', trend: 'up' },
  { label: 'Event Profitability', value: '31.8%', trend: 'up' },
]

const opportunities = [
  { title: 'Premium suite recovery', impact: '$1.2M', priority: 'High', confidence: '94%', agent: 'Revenue Opportunity Detection', status: 'Ready to activate' },
  { title: 'Dynamic ticket pricing uplift', impact: '$2.8M', priority: 'Critical', confidence: '92%', agent: 'Dynamic Pricing', status: 'Scenario approved' },
  { title: 'Sponsorship inventory expansion', impact: '$950K', priority: 'High', confidence: '89%', agent: 'Sponsorship Optimization', status: 'Negotiation phase' },
  { title: 'Concession upsell bundle', impact: '$640K', priority: 'Medium', confidence: '91%', agent: 'Fan Spend Optimization', status: 'Campaign ready' },
]

const forecastEvents = [
  { name: 'Opening Night', attendance: '18,640', demand: '98% sold', revenue: '$3.4M', trend: '+12%' },
  { name: 'Midweek Rivalry', attendance: '22,140', demand: '96% sold', revenue: '$4.1M', trend: '+9%' },
  { name: 'Concert Weekend', attendance: '28,900', demand: '104% of plan', revenue: '$5.5M', trend: '+17%' },
  { name: 'Championship Final', attendance: '25,450', demand: '102% of plan', revenue: '$6.2M', trend: '+15%' },
]

const pricingScenarios = [
  { label: 'Current pricing', value: '$84', change: 'baseline' },
  { label: 'Recommended pricing', value: '$96', change: '+14.3%' },
  { label: 'Premium package option', value: '$142', change: '+21.1%' },
  { label: 'Bundle upsell', value: '$179', change: '+26.8%' },
]

const sponsorshipInventory = [
  { asset: 'LED ribbon board', utilization: '92%', revenue: '$425K', status: 'Sold to 3 brands' },
  { asset: 'Club hospitality suites', utilization: '87%', revenue: '$760K', status: '4 premium packages open' },
  { asset: 'Digital signage network', utilization: '81%', revenue: '$610K', status: 'High engagement' },
  { asset: 'Fan zone activations', utilization: '74%', revenue: '$390K', status: 'Upsell opportunity' },
]

const fanSegments = [
  { segment: 'Loyal Season Members', spend: '$128', offer: 'Priority premium upgrade', likelyLift: '+18%' },
  { segment: 'High-value families', spend: '$94', offer: 'Bundle merch + parking', likelyLift: '+14%' },
  { segment: 'Corporate partners', spend: '$176', offer: 'VIP hospitality additive', likelyLift: '+22%' },
  { segment: 'Event-specific fans', spend: '$71', offer: 'Limited-time concession deal', likelyLift: '+13%' },
]

const businessOutcomes = [
  'Increased Revenue',
  'Improved Venue Profitability',
  'Improved Revenue Forecasting',
  'Increased Fan Spend',
  'Increased Premium Revenue',
  'Improved Sponsorship Utilization',
  'Better Planning Decisions',
  'Faster Revenue Opportunity Identification',
  'Higher Event Margins',
  'Better Executive Visibility',
]

const executiveBriefing = [
  { title: 'Revenue outlook', detail: 'Projected 17.3% growth driven by premium inventory recovery, pricing optimization, and sponsorship expansion.' },
  { title: 'Business risks', detail: 'Parking shortages and staffing gaps could reduce event profitability if not addressed in the next 14 days.' },
  { title: 'Strategic recommendations', detail: 'Launch targeted premium inventory outreach, expand dynamic pricing to parking, and bundle hospitality offers for high-value segments.' },
]

const scenarioTiles = [
  {
    id: 'problem',
    title: 'The Revenue Problem',
    subtitle: 'Venue leadership is working across disconnected systems',
    metrics: ['Ticketing platform', 'Sponsorship platform', 'POS systems', 'CRM', 'Parking platform', 'Merchandise systems'],
    narrative: 'The Executive Intelligence Agent identifies revenue leakage across every channel and highlights missed opportunities that could otherwise be captured with better coordination.',
    result: 'Opportunity identified: $3.9M in under-monitized revenue across ticketing, sponsorship, and fan spend.',
  },
  {
    id: 'ticket',
    title: 'Ticket Revenue Optimization',
    subtitle: 'Demand sentiment is stronger than forecast',
    metrics: ['Existing revenue forecast', 'Updated revenue forecast', 'Incremental gain'],
    narrative: 'The Demand Forecasting Agent projects stronger-than-expected attendance while the Dynamic Pricing Agent raises strategic price points across premium inventory and general admission.',
    result: 'Revenue uplift: +$2.8M from inventory re-pricing and higher conversion rates.',
  },
  {
    id: 'suite',
    title: 'Premium Suite Inventory Recovery',
    subtitle: 'Previously unsold inventory is ready for conversion',
    metrics: ['Suite availability', 'Likely buyers', 'Recovered premium revenue'],
    narrative: 'The Revenue Opportunity Agent surfaces unsold suites and matches them with likely buyers. Targeted outreach and packaging unlock a high-margin revenue recovery opportunity.',
    result: 'Recovered premium inventory value: $1.2M with 92% confidence.',
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship Expansion Opportunity',
    subtitle: 'Digital inventory is outperforming the portfolio',
    metrics: ['Additional inventory', 'Upsell packages', 'Expanded sponsorship programs'],
    narrative: 'The Sponsorship Optimization Agent identifies under-monetized digital assets and recommends a larger package mix that strengthens brand activation and revenue capture.',
    result: 'Sponsorship growth: +$950K with stronger digital activations and package expansion.',
  },
  {
    id: 'concession',
    title: 'Concession Revenue Growth',
    subtitle: 'Sold-out demand creates upsell opportunity',
    metrics: ['Additional staff', 'Inventory increases', 'Personalized offers'],
    narrative: 'The Fan Spend Optimization Agent models elevated demand and recommends staffing, inventory, and personalized offers that drive higher per-capita revenue.',
    result: 'Per-cap spend improvement: +$12.40 with stronger conversion and reduced wait times.',
  },
  {
    id: 'parking',
    title: 'Parking Revenue Optimization',
    subtitle: 'Forecasting predicts parking scarcity',
    metrics: ['Parking shortages', 'Dynamic pricing', 'Revenue uplift'],
    narrative: 'The Forecasting Agent shapes demand signals to determine where parking premiums should move. Dynamic pricing maximizes revenue without worsening the fan experience.',
    result: 'Parking revenue increase: +$480K from time-based pricing adjustments and pre-sale conversion.',
  },
  {
    id: 'merch',
    title: 'Merchandise Optimization',
    subtitle: 'Demand is spiking around high-impact events',
    metrics: ['Inventory allocation', 'Targeted promotions', 'Event-specific offers'],
    narrative: 'The agents coordinate inventory planning and targeted promotions to maximize merchandise capture while minimizing stockout risk during marquee events.',
    result: 'Merchandise capture: +$360K from surge inventory and personalized bundles.',
  },
  {
    id: 'concert',
    title: 'Concert Revenue Planning',
    subtitle: 'Major concert demand triggers multi-stream planning',
    metrics: ['Attendance', 'Parking', 'Merchandise', 'Food and beverage', 'Sponsorship'],
    narrative: 'Cross-agent planning produces a full revenue blueprint for a major concert, aligning attendance, logistics, sponsorship, and premium fan experience to maximize profitability.',
    result: 'Revenue plan created with 12-week model covering parking, concessions, merchandise, and sponsorship.',
  },
  {
    id: 'collab',
    title: 'Multi-Agent Collaboration',
    subtitle: 'Every agent contributes to a single business opportunity',
    metrics: ['Opportunity detection', 'Forecasting model', 'Pricing recommendation', 'Fan offers', 'Executive summary'],
    narrative: 'The Revenue Opportunity Detection Agent discovers the gap, the Forecasting Agent models the effect, the Pricing Agent recommends change, the Fan Spend Agent tailors offers, and the Executive Intelligence Agent summarizes the business outcome.',
    result: 'Outcome: coordinated decision-making shortens the cycle from insight to revenue capture by 38%.',
  },
  {
    id: 'outcomes',
    title: 'Executive Outcomes',
    subtitle: 'The final board-level dashboard is ready',
    metrics: ['Revenue growth', 'Premium inventory performance', 'Sponsorship growth', 'Per-cap spending improvements', 'Event profitability improvements', 'Forecast accuracy improvements'],
    narrative: 'The board view combines before-and-after operating metrics to show how coordinated agent actions drive better profitability, forecast discipline, and premium fan monetization.',
    result: 'Board-ready summary: revenue +18.7%, premium seating +14.2%, sponsorship +11.9%, forecast accuracy 96.4%.',
  },
]

const agents = {
  revenue: {
    title: 'Revenue Opportunity Detection Agent',
    inputs: ['Ticketing, parking, sponsorship, concessions, premium seat data', 'Historical revenue benchmarks', 'Live demand signals'],
    outputs: ['Revenue opportunity alerts', 'Potential revenue impact', 'Priority score', 'Confidence score'],
    decisions: ['Prioritize opportunities by revenue upside and execution risk', 'Surface underperforming inventory opportunities', 'Recommend near-term action windows'],
    actions: ['Launch targeted suite recovery campaign', 'Re-engage premium package purchasers', 'Recommend sponsorship inventory expansion'],
    impact: 'Identifies missed revenue before the opportunity window closes and creates a ranked action list for the executive team.',
  },
  demand: {
    title: 'Demand Forecasting Agent',
    inputs: ['Historical attendance patterns', 'Event calendars', 'Fan demand curves', 'Inventory trends'],
    outputs: ['Attendance projections', 'Revenue forecasts', 'Occupancy forecasts', 'Capacity recommendations'],
    decisions: ['Projected demand by event and segment', 'Build confidence bands for hospitality and parking', 'Align pricing calendar to expected demand'],
    actions: ['Adjust staffing plans', 'Signal premium inventory release', 'Price parking by time based on crowd patterns'],
    impact: 'Improves forecast accuracy and helps leaders plan staffing, pricing, and selling strategy before demand shifts.',
  },
  pricing: {
    title: 'Dynamic Pricing Agent',
    inputs: ['Current price schedule', 'Market demand signals', 'Competitive benchmarks', 'Inventory velocity'],
    outputs: ['Pricing recommendations', 'Revenue lift projections', 'Scenario comparisons'],
    decisions: ['Optimize ticket, suite, and parking pricing', 'Balance affordability with revenue yield', 'Test promotional and bundle strategies'],
    actions: ['Raise pricing on high-demand premium inventory', 'Bundle parking and merchandise offers', 'Run limited-time concession promotions'],
    impact: 'Maximizes revenue yield while preserving conversion and fan satisfaction across the calendar.',
  },
  sponsorship: {
    title: 'Sponsorship Optimization Agent',
    inputs: ['Sponsorship inventory ledger', 'Activation performance metrics', 'Audience engagement scores', 'Brand spend history'],
    outputs: ['Sponsorship opportunities', 'Inventory utilization scores', 'Revenue recommendations'],
    decisions: ['Identify underutilized digital inventory', 'Recommend renewal and expansion packages', 'Score activation effectiveness by brand outcome'],
    actions: ['Upsell LED inventory and hospitality assets', 'Expand brand packages into digital touchpoints', 'Refresh inactive sponsorship bundles'],
    impact: 'Boosts sponsor results and converts dormant marketing inventory into measurable revenue.',
  },
  fan: {
    title: 'Fan Spend Optimization Agent',
    inputs: ['Purchase behavior', 'CRM segment history', 'Loyalty data', 'Concession demand trends'],
    outputs: ['Offer recommendations', 'Cross-sell opportunities', 'Expected revenue impact'],
    decisions: ['Segment fans by spending propensity', 'Recommend personalized offers based on anticipated behavior', 'Match offers to event context and demand'],
    actions: ['Offer event-specific merch bundles', 'Promote parking and premium upgrades', 'Target fans with personalized concession offers'],
    impact: 'Increases average spend per attendee while preserving brand affinity and retention.',
  },
  executive: {
    title: 'Executive Intelligence Agent',
    inputs: ['Cross-agent outputs', 'Business objectives', 'Risk tolerance', 'Portfolio performance'],
    outputs: ['Executive summaries', 'Business recommendations', 'Revenue outlook forecasts'],
    decisions: ['Prioritize scoreboard impact', 'Consolidate revenue opportunities across functions', 'Narrate results for leadership reviews'],
    actions: ['Summarize board-ready performance', 'Recommend next-quarter actions', 'Coordinate follow-through across revenue teams'],
    impact: 'Turns fragmented signals into a single executive narrative and a prioritized operating plan.',
  },
}

const architectureNodes = [
  { id: 'ticketmaster', label: 'Ticketmaster', role: 'Primary ticketing and demand data source that captures inventory, pricing, and event conversion patterns.' },
  { id: 'seatgeek', label: 'SeatGeek', role: 'Secondary market intelligence that helps benchmark demand and price elasticity for live events.' },
  { id: 'crm', label: 'CRM', role: 'Captures fan engagement, segment performance, and lifetime value insights for personalization strategy.' },
  { id: 'pos', label: 'POS Systems', role: 'Tracks concession, retail, and hospitality transactions to measure spend, margin, and conversion uplift.' },
  { id: 'sponsorship', label: 'Sponsorship Systems', role: 'Monitors sponsor inventory, fulfillment, activation metrics, and renewal opportunities across the venue portfolio.' },
  { id: 'parking', label: 'Parking Systems', role: 'Collects vehicle flow, pricing, occupancy, and time-of-day demand to optimize parking revenue.' },
  { id: 'commerce', label: 'E-Commerce Platforms', role: 'Unifies merchandise and digital fan commerce activity into a single monetization layer.' },
  { id: 'loyalty', label: 'Loyalty Platforms', role: 'Measures relationship strength and personalized offer performance to support retention and expansion.' },
  { id: 'finance', label: 'Finance Systems', role: 'Connects operating results and profitability data to ensure strategic decisions balance growth with margins.' },
  { id: 'marketing', label: 'Marketing Platforms', role: 'Drives audience demand, campaign performance, and fan activation to support revenue generation.' },
  { id: 'fabric', label: 'Microsoft Fabric', role: 'Provides a unified analytics foundation for integrating operational, finance, and fan data across the venue ecosystem.' },
  { id: 'onelake', label: 'OneLake', role: 'Stores governed, high-volume venue data in a single analytical lake that powers cross-functional decisioning.' },
  { id: 'ai-foundry', label: 'Azure AI Foundry', role: 'Hosts AI workflows, model orchestration, and reusable data science pipelines for revenue optimization and forecasting.' },
  { id: 'openai', label: 'Azure OpenAI', role: 'Generates summaries, next-best actions, and natural language explainers for executive and operational users.' },
  { id: 'agents', label: 'Venue Revenue AI Agents', role: 'A coordinated set of specialized agents that detect opportunities, forecast demand, recommend pricing, and summarize impact.' },
  { id: 'copilot', label: 'Copilot Studio Agent Orchestration', role: 'Coordinates agent workflows, actions, and handoffs across the business to drive timely, high-confidence decisions.' },
  { id: 'power', label: 'Power Platform Applications', role: 'Delivers operational experiences in Power Apps, Power Automate, and other low-code surfaces for business users.' },
  { id: 'command', label: 'Executive Revenue Command Center', role: 'The board-ready operating surface that enables executive teams to monitor, act, and optimize revenue across every stream.' },
]

const techStack = [
  'Microsoft Copilot Studio',
  'Azure AI Foundry',
  'Azure OpenAI Service',
  'Microsoft Fabric',
  'OneLake',
  'Power BI',
  'Dataverse',
  'Power Apps',
  'Power Automate',
  'Microsoft Teams',
  'Microsoft Entra ID',
  'Microsoft Purview',
  'Azure Event Hubs',
  'Azure Functions',
]

const tonightSections = [
  { id: '523', tier: '500 Level · Upper Bowl', empty: 528, fill: 48 },
  { id: '517', tier: '500 Level · Upper Bowl', empty: 496, fill: 54 },
  { id: '511', tier: '500 Level · Upper Bowl', empty: 470, fill: 57 },
  { id: '505', tier: '500 Level · Upper Bowl', empty: 441, fill: 61 },
  { id: '221', tier: '200 Level · Club', empty: 264, fill: 68 },
  { id: '215', tier: '200 Level · Club', empty: 232, fill: 72 },
  { id: '209', tier: '200 Level · Club', empty: 205, fill: 76 },
  { id: '203', tier: '200 Level · Club', empty: 244, fill: 70 },
  { id: '124', tier: '100 Level · Premium', empty: 412, fill: 63 },
  { id: '118', tier: '100 Level · Premium', empty: 386, fill: 66 },
  { id: '112', tier: '100 Level · Premium', empty: 344, fill: 72 },
  { id: '106', tier: '100 Level · Premium', empty: 298, fill: 78 },
  { id: 'Outfield A', tier: 'Outfield', empty: 318, fill: 59 },
  { id: 'Outfield B', tier: 'Outfield', empty: 287, fill: 64 },
  { id: 'Outfield C', tier: 'Outfield', empty: 262, fill: 69 },
  { id: 'Courtside 1', tier: 'Courtside · Rinkside', empty: 44, fill: 82 },
  { id: 'Rinkside 2', tier: 'Courtside · Rinkside', empty: 38, fill: 86 },
  { id: 'Courtside 3', tier: 'Courtside · Rinkside', empty: 36, fill: 88 },
]

const liveRunSteps = [
  { title: 'Scanning stadium', detail: 'Ingesting live turnstile and ticket scans', agent: 'Inventory Agent' },
  { title: 'Identifying empty seats', detail: 'Detecting unsold and unoccupied inventory', agent: 'Inventory Agent' },
  { title: 'Segmenting fans', detail: 'Scoring upgrade propensity across the bowl', agent: 'Fan Affinity Agent' },
  { title: 'Generating offers', detail: 'Pricing and composing personalized offers', agent: 'Pricing + Offer Agents' },
  { title: 'Deploying offers', detail: 'Pushing offers to fan devices in-venue', agent: 'Offer Agent' },
  { title: 'Capturing revenue', detail: 'Reconciling upgrades, F&B and merchandise', agent: 'Revenue Agent' },
]

const tonightOffers = [
  { id: 'mike', initials: 'MK', fan: 'Mike K.', currentSeat: 'Section 523 · Row 9', targetSeat: 'Section 124 · Row 4', price: 20, channel: 'Ballpark app', match: '82% upgrade likelihood', message: 'Move from Section 523 to Section 124 for $20.' },
  { id: 'jordan', initials: 'JT', fan: 'Jordan T.', currentSeat: 'Section 517 · Row 14', targetSeat: 'Section 118 · Row 8', price: 28, channel: 'SMS text', match: '78% upgrade likelihood', message: 'A better view is waiting. Upgrade to Section 118 for $28.' },
  { id: 'casey', initials: 'CR', fan: 'Casey R.', currentSeat: 'Section 511 · Row 6', targetSeat: 'Section 215 · Row 3', price: 35, channel: 'Email', match: '74% upgrade likelihood', message: 'Enjoy club-level seats tonight. Move to Section 215 for $35.' },
]

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [activePage, setActivePage] = useState('Overview')
  const [selectedAgent, setSelectedAgent] = useState('revenue')
  const [selectedScenario, setSelectedScenario] = useState(scenarioTiles[0])
  const [selectedArchitecture, setSelectedArchitecture] = useState(architectureNodes[0])
  const [runStatus, setRunStatus] = useState('standby')
  const [runStep, setRunStep] = useState(0)
  const [selectedSection, setSelectedSection] = useState(tonightSections[0])
  const [acceptedOffers, setAcceptedOffers] = useState([])
  const [dismissedOffers, setDismissedOffers] = useState([])

  useEffect(() => {
    if (runStatus !== 'running' || runStep >= liveRunSteps.length) return undefined

    const timeout = window.setTimeout(() => {
      setRunStep((currentStep) => Math.min(currentStep + 1, liveRunSteps.length))
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [runStatus, runStep])

  const currentAgent = agents[selectedAgent]
  const architectureDetail = selectedArchitecture
  const runComplete = runStep >= liveRunSteps.length
  const acceptedRevenue = acceptedOffers.reduce((total, offer) => total + offer.price, 0)
  const startTonightRun = () => {
    setRunStep(0)
    setAcceptedOffers([])
    setDismissedOffers([])
    setRunStatus('running')
    setActivePage('Live Optimization')
  }
  const resetDemo = () => {
    setRunStep(0)
    setAcceptedOffers([])
    setDismissedOffers([])
    setRunStatus('standby')
    setActivePage('Overview')
  }
  const acceptOffer = (offer) => {
    setAcceptedOffers((currentOffers) => [...currentOffers, offer])
  }
  const dismissOffer = (offerId) => {
    setDismissedOffers((currentOffers) => [...currentOffers, offerId])
  }

  const pageMap = {
    Overview: 'live',
    'Live Optimization': 'live',
    'Fan Journey': 'fanJourney',
    'Revenue Impact': 'revenueImpact',
    'Microsoft Cloud': 'architecture',
    'Executive Revenue Command Center': 'command',
    'Revenue Opportunity Center': 'opportunities',
    'Demand Forecasting Center': 'forecasting',
    'Dynamic Pricing Center': 'pricing',
    'Sponsorship Intelligence Center': 'sponsorship',
    'Fan Monetization Center': 'monetization',
    'Executive Intelligence Center': 'intelligence',
    'Executive Demo Walkthrough': 'walkthrough',
    'How The Agents Work Together': 'agents',
    'Microsoft AI Architecture': 'architecture',
    'KPI Dashboard': 'kpis',
    'Business Outcomes': 'outcomes',
  }

  const pageKey = pageMap[activePage] || 'command'

  return (
    <div className={`app-shell theme-${theme}`}>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">V</div>
          <div>
            <div className="brand-name">Venue Revenue Optimizer</div>
            <div className="brand-subtitle">Revenue Operations Console</div>
          </div>
        </div>

        <nav className="page-nav" aria-label="Main navigation">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={page === activePage ? 'nav-item active' : 'nav-item'}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <span className="event-live-label"><i />Live event · Gate open · Simulated data</span>
          <button type="button" className="reset-demo-button" onClick={resetDemo}>Reset demo</button>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <main className="content-shell">
        {pageKey === 'live' && (
          <section className="page-block live-page">
            <div className="live-hero">
              <div className="live-hero-copy">
                <span className="eyebrow">Venue Revenue Optimizer Agent</span>
                <h1>Autonomous revenue optimization for every live event.</h1>
                <p>Every empty seat is a revenue opportunity. Match live inventory with fans already in the building, then make a personalized, in-seat upgrade offer through the channel they use.</p>
                <div className="live-hero-actions">
                  <button className="primary-button" type="button" onClick={startTonightRun}>
                    {runComplete ? 'Run Tonight’s Optimization Again' : runStatus === 'running' ? 'Optimization running…' : "Run Tonight's Optimization"}
                  </button>
                  <button className="text-link-button" type="button" onClick={() => document.getElementById('live-agent-workforce')?.scrollIntoView({ behavior: 'smooth' })}>See how the agents work ↓</button>
                </div>
              </div>
              <div className="live-hero-kpis">
                <div><span>Tonight’s attendance</span><strong>38,227</strong></div>
                <div><span>Empty seats detected</span><strong>4,183</strong></div>
                <div><span>Revenue opportunity</span><strong>$176K</strong></div>
                <div><span>Fan upgrade candidates</span><strong>1,248</strong></div>
                <div className="live-kpi-highlight"><span>Projected conversion</span><strong>27%</strong></div>
              </div>
            </div>

            <div className="control-room-header">
              <div>
                <span className="eyebrow">Operations dashboard</span>
                <h2>Tonight’s revenue control room</h2>
              </div>
              <span className={`pill status-pill ${runComplete ? 'complete' : runStatus === 'running' ? 'active' : ''}`}>
                {runComplete ? 'Offers deployed' : runStatus === 'running' ? 'Agents active' : 'Standby'}
              </span>
            </div>

            <div className="live-metric-grid">
              <article className="live-metric-card"><span>Empty seat inventory</span><strong>4,183</strong><small>seats unsold or unoccupied</small></article>
              <article className="live-metric-card"><span>Upgrade revenue</span><strong>${acceptedRevenue.toLocaleString()}</strong><small>{acceptedOffers.length} in-game seat upgrades</small></article>
              <article className="live-metric-card"><span>Concession upsell</span><strong>$0</strong><small>food &amp; beverage attach</small></article>
              <article className="live-metric-card"><span>Merchandise upsell</span><strong>$0</strong><small>retail &amp; team store</small></article>
              <article className="live-metric-card total"><span>Total incremental revenue</span><strong>${acceptedRevenue.toLocaleString()}</strong><small>captured from accepted offers</small></article>
            </div>

            <div className="live-workspace">
              <section className="live-panel stadium-panel">
                <div className="live-panel-heading">
                  <div>
                    <span className="eyebrow">Stadium heat map</span>
                    <h2>Section-level inventory intelligence</h2>
                    <p>Live occupancy and available seats · select a section for details</p>
                  </div>
                  <div className="heatmap-legend">
                    <span><i className="legend-hot" />High empty inventory</span>
                    <span><i className="legend-offer" />Upgrade candidates</span>
                    <span><i className="legend-full" />Optimized / sold</span>
                  </div>
                </div>

                <div className="stadium-bowl" aria-label="Interactive stadium section heat map">
                  <div className="stadium-tier upper-tier">
                    <div className="tier-label">500 LEVEL <span>UPPER BOWL</span><strong>1,935 empty</strong></div>
                    <div className="seat-sections">
                      {tonightSections.slice(0, 4).map((section) => (
                        <button key={section.id} type="button" className={`seat-section ${section.fill < 60 ? 'heat-high' : 'heat-medium'} ${selectedSection.id === section.id ? 'selected' : ''}`} onClick={() => setSelectedSection(section)}>
                          <span>SEC {section.id}</span><strong>{section.empty}</strong><small>seats open</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="stadium-tier club-tier">
                    <div className="tier-label">200 LEVEL <span>CLUB</span><strong>945 empty</strong></div>
                    <div className="seat-sections">
                      {tonightSections.slice(4, 8).map((section) => (
                        <button key={section.id} type="button" className={`seat-section ${section.fill < 70 ? 'heat-high' : 'heat-medium'} ${selectedSection.id === section.id ? 'selected' : ''}`} onClick={() => setSelectedSection(section)}>
                          <span>SEC {section.id}</span><strong>{section.empty}</strong><small>seats open</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="stadium-tier premium-tier">
                    <div className="tier-label">100 LEVEL <span>PREMIUM</span><strong>1,440 empty</strong></div>
                    <div className="seat-sections">
                      {tonightSections.slice(8, 12).map((section) => (
                        <button key={section.id} type="button" className={`seat-section ${section.fill < 70 ? 'heat-high' : 'heat-medium'} ${selectedSection.id === section.id ? 'selected' : ''}`} onClick={() => setSelectedSection(section)}>
                          <span>SEC {section.id}</span><strong>{section.empty}</strong><small>seats open</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field-of-play">
                    <div className="field-lines"><span>VENUE</span><strong>FIELD OF PLAY</strong><span>TONIGHT · 7:10 PM</span></div>
                  </div>
                  <div className="auxiliary-labels"><span>OUTFIELD SEATS <strong>867 empty</strong></span><span>COURTSIDE / RINKSIDE <strong>118 empty</strong></span></div>
                  <div className="auxiliary-sections">
                    {tonightSections.slice(12).map((section) => (
                      <button key={section.id} type="button" className={`aux-section ${selectedSection.id === section.id ? 'selected' : ''}`} onClick={() => setSelectedSection(section)}>
                        <span>{section.id}</span><strong>{section.empty}</strong>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="selected-section-detail">
                  <div className="selected-section-icon">⌖</div>
                  <div><span>Selected inventory</span><strong>{selectedSection.tier} · Section {selectedSection.id}</strong></div>
                  <div className="selected-seats"><strong>{selectedSection.empty}</strong><span>empty seats</span></div>
                  <div className="occupancy"><div><span>Section occupancy</span><strong>{selectedSection.fill}%</strong></div><div className="progress-bar"><span style={{ width: `${selectedSection.fill}%` }} /></div></div>
                </div>
              </section>

              <section className="live-panel workforce-panel" id="live-agent-workforce">
                <div className="live-panel-heading">
                  <div>
                    <span className="eyebrow">Agent workforce</span>
                    <h2>Optimization sequence</h2>
                    <p>Autonomous specialists · orchestrated run</p>
                  </div>
                  <strong className="run-progress-number">{Math.round((runStep / liveRunSteps.length) * 100)}%</strong>
                </div>
                <div className="run-progress"><span style={{ width: `${(runStep / liveRunSteps.length) * 100}%` }} /></div>
                <div className="sequence-list">
                  {liveRunSteps.map((step, index) => (
                    <div key={step.title} className={`sequence-step ${index < runStep ? 'done' : index === runStep && runStatus === 'running' ? 'current' : ''}`}>
                      <span className="step-number">{index < runStep ? '✓' : index + 1}</span>
                      <div><strong>{step.title}</strong><small>{step.detail}</small></div>
                      <em>{index < runStep ? 'Done' : index === runStep && runStatus === 'running' ? 'Working' : 'Queued'}</em>
                    </div>
                  ))}
                </div>
                <div className="specialist-heading">SPECIALISTS</div>
                <div className="specialist-list">
                  {[
                    ['Inventory Agent', 'Live seat inventory scan', 0],
                    ['Fan Affinity Agent', 'Fan propensity modelling', 2],
                    ['Pricing Agent', 'Dynamic upgrade pricing', 3],
                    ['Offer Agent', 'Personalized offer delivery', 4],
                    ['Revenue Agent', 'Incremental revenue tracking', 5],
                  ].map(([name, task, index]) => (
                    <div key={name} className="specialist-row">
                      <span className={`specialist-dot ${index < runStep ? 'done' : index === runStep && runStatus === 'running' ? 'working' : ''}`} />
                      <div><strong>{name}</strong><small>{task}</small></div>
                      <em>{index < runStep ? 'Complete' : index === runStep && runStatus === 'running' ? 'Active' : 'Idle'}</em>
                    </div>
                  ))}
                </div>
                <div className="activity-stream">
                  <span className="specialist-heading">ACTIVITY STREAM</span>
                  {runStep === 0 ? <p>No active run. Launch tonight’s outlook to dispatch the agent workforce.</p> : (
                    <div className="activity-entry"><i />{liveRunSteps[Math.min(runStep - 1, liveRunSteps.length - 1)].agent}: {liveRunSteps[Math.min(runStep - 1, liveRunSteps.length - 1)].detail}</div>
                  )}
                  {runComplete && <div className="activity-entry success"><i />1,248 fans scored · 337 personalized upgrade offers dispatched.</div>}
                </div>
              </section>
            </div>

            <section className="live-panel offer-panel">
              <div className="live-panel-heading">
                <div>
                  <span className="eyebrow">Personalized fan journey</span>
                  <h2>One fan, one offer, compounding revenue</h2>
                  <p>Offers are simulated for the demo. Accepting one updates the live revenue tally; no real transactions or messages occur.</p>
                </div>
                <span className="pill status-pill">{runComplete ? '337 offers dispatched' : 'Awaiting optimization run'}</span>
              </div>
              {runStep < 4 ? (
                <div className="offer-empty-state">
                  <div className="offer-phone-icon">✉</div>
                  <div><strong>Offers are waiting for the agent run</strong><span>Run tonight’s outlook to score fan propensity, price upgrades, and preview app, text, and email offers.</span></div>
                </div>
              ) : (
                <div className="fan-offer-grid">
                  {tonightOffers.map((offer) => {
                    const isAccepted = acceptedOffers.some((accepted) => accepted.id === offer.id)
                    const isDismissed = dismissedOffers.includes(offer.id)
                    return (
                      <article key={offer.id} className={`fan-offer-card ${isAccepted ? 'offer-accepted' : ''} ${isDismissed ? 'offer-dismissed' : ''}`}>
                        <div className="offer-channel-row"><span className="offer-channel">{offer.channel}</span><span className="offer-time">now</span></div>
                        <div className="offer-fan-row"><span className="fan-avatar">{offer.initials}</span><div><strong>{offer.fan}</strong><small>{offer.currentSeat}</small></div><span className="match-score">{offer.match}</span></div>
                        <div className="offer-message"><strong>{offer.fan}, you’ve been selected for a seat upgrade.</strong><p>{offer.message}</p><div className="seat-move"><span>{offer.currentSeat.split(' · ')[0]}</span><b>→</b><span>{offer.targetSeat.split(' · ')[0]}</span><strong>${offer.price}</strong></div></div>
                        {isAccepted ? <div className="offer-result accepted">✓ Upgrade accepted · +${offer.price} captured</div> : isDismissed ? <div className="offer-result">Offer dismissed</div> : <div className="offer-actions"><button type="button" onClick={() => acceptOffer(offer)}>Accept upgrade</button><button type="button" onClick={() => dismissOffer(offer.id)}>Not now</button></div>}
                      </article>
                    )
                  })}
                </div>
              )}
            </section>

            <section className="why-matters-section" id="why-it-matters">
              <div className="live-panel-heading">
                <div>
                  <span className="eyebrow">Why this matters</span>
                  <h2>Built for the business of live sports and entertainment</h2>
                  <p>A single agentic layer turns every empty seat and fan signal into a revenue opportunity—without adding headcount or disrupting game-day operations.</p>
                </div>
              </div>
              <div className="benefit-grid">
                {[
                  ['Monetize unused inventory', 'Convert empty premium seats and underused sections into incremental ticket revenue before inventory expires at puck drop or first pitch.'],
                  ['Increase per-cap fan spend', 'Pair seat upgrades with targeted concession, merchandise, and loyalty offers to raise average spend across every event.'],
                  ['Personalize the in-venue experience', 'Deliver the right offer at the right moment, using live signals to match fans with better sightlines and exclusive experiences.'],
                  ['Activate first-party data', 'Unify ticketing, loyalty, CRM, POS, media, and retail signals into a privacy-safe view of each fan.'],
                ].map(([title, detail], index) => (
                  <article key={title} className="benefit-card">
                    <span className="benefit-number">0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </article>
                ))}
              </div>
              <div className="executive-summary">
                <span className="eyebrow">Executive summary</span>
                <p>Venue Revenue Optimizer Agent demonstrates how agentic AI can move sports and entertainment organizations from static event operations to real-time revenue optimization. By combining fan signals, ticket inventory, pricing logic, loyalty data, and in-venue offers, the system identifies the next best action for every fan and every empty seat.</p>
              </div>
            </section>

            <div className="simulation-note">SIMULATED VENUE DATA · Fan identities and offers are fictional · No real customer records or transactions</div>
          </section>
        )}

        {pageKey === 'fanJourney' && (
          <section className="page-block">
            <div className="subpage-intro">
              <span className="eyebrow">Fan journey · Customer 360</span>
              <h1>One fan, one offer, compounding revenue.</h1>
              <p>A privacy-safe fan profile turns in-venue signals into a timely, relevant upgrade—not a generic promotion.</p>
            </div>
            <div className="fan-journey-layout">
              <article className="phone-demo">
                <div className="phone-top"><span>7:41</span><span>●●● ◉</span></div>
                <div className="phone-event">THURSDAY · BOTTOM OF THE 6TH</div>
                <div className="phone-notification">
                  <div className="phone-app-row"><span className="app-avatar">A</span><div><strong>Ballpark App</strong><small>now</small></div><span>•••</span></div>
                  <h3>Mike, you’ve been selected for a 7th inning seat upgrade.</h3>
                  <p>Move from Section 523 to Section 124 for $20.</p>
                  <div className="phone-seat-card"><span>YOUR CURRENT VIEW</span><strong>Section 523 <b>→</b> Section 124</strong><small>Premium lower bowl · Row 4</small><em>$20 upgrade</em></div>
                  {acceptedOffers.some((offer) => offer.id === 'mike') ? <div className="phone-accepted">✓ Upgrade confirmed · Section 124</div> : <div className="phone-buttons"><button type="button" onClick={() => acceptOffer(tonightOffers[0])}>Accept Upgrade</button><button type="button" onClick={() => dismissOffer('mike')}>Not Now</button></div>}
                  <div className="phone-demo-note">Simulated fan device · no real transactions occur</div>
                </div>
                <div className="phone-home-indicator" />
              </article>
              <article className="fan-profile-card">
                <div className="profile-heading">
                  <span className="fan-avatar profile-avatar">MK</span>
                  <div><span className="eyebrow">Customer 360 · Fan profile</span><h2>Mike K.</h2><p>Fan ID SIM-88421 · Section 523, Row 9</p></div>
                </div>
                <div className="propensity-block"><div><span>Upgrade likelihood</span><strong>82%</strong></div><div className="progress-bar"><span style={{ width: '82%' }} /></div></div>
                <div className="profile-signals">
                  <div><span>Wireless customer</span><strong>Active · 6 yrs</strong></div>
                  <div><span>Sports viewer</span><strong>42 hrs this season</strong></div>
                  <div><span>Games attended</span><strong>4 this season</strong></div>
                  <div><span>Merchandise purchases</span><strong>2 transactions</strong></div>
                  <div><span>Loyalty member</span><strong>Gold tier</strong></div>
                </div>
                <div className="recommended-offer"><span>RECOMMENDED OFFER</span><strong>100-level seat upgrade + merchandise bundle</strong><small>Selected for relevance, value, and real-time inventory.</small></div>
                <p className="privacy-note">Simulated data for demonstration purposes only. No real customer records are used.</p>
              </article>
            </div>
          </section>
        )}

        {pageKey === 'revenueImpact' && (
          <section className="page-block">
            <div className="subpage-intro">
              <span className="eyebrow">Executive ROI summary</span>
              <h1>Turn live-event operations into a real-time revenue engine.</h1>
              <p>A before-and-after view of the value created when inventory, fan signals, and offers work together.</p>
            </div>
            <div className="roi-comparison">
              <article className="roi-card before">
                <span className="roi-label">BEFORE THE AGENT</span>
                <h2>Revenue lost to disconnected operations</h2>
                <div className="roi-line"><span>Unsold / underused seats</span><strong>4,183</strong></div>
                <div className="roi-line"><span>Incremental revenue captured</span><strong>$0</strong></div>
                <div className="roi-line"><span>Promotion strategy</span><strong>Generic promotions</strong></div>
                <div className="roi-line"><span>Operations decisions</span><strong>Manual, post-game</strong></div>
              </article>
              <article className="roi-card after">
                <span className="roi-label">AFTER THE AGENT</span>
                <h2>Personalized, real-time value capture</h2>
                <div className="roi-line"><span>Seat upgrades sold</span><strong>1,104</strong></div>
                <div className="roi-line"><span>Ticket upgrade revenue</span><strong>$82,000</strong></div>
                <div className="roi-line"><span>Concession upsell</span><strong>$47,000</strong></div>
                <div className="roi-line"><span>Merchandise upsell</span><strong>$31,000</strong></div>
                <div className="roi-total"><span>Total incremental revenue</span><strong>$160,000</strong></div>
                <div className="roi-experience"><span>Fan experience</span><strong>Personalized, real time</strong></div>
              </article>
            </div>
            <div className="simulation-note">ILLUSTRATIVE DEMO OUTCOMES · Simulated local data · Actual results depend on inventory, fan consent, and offer eligibility</div>
          </section>
        )}

        {pageKey === 'command' && (
          <section className="page-block">
            <div className="hero-panel">
              <div className="hero-copy">
                <span className="eyebrow">Executive revenue intelligence</span>
                <h1>Drive every revenue stream with coordinated AI execution.</h1>
                <p>
                  The Venue Revenue Optimizer helps leadership teams forecast demand, price dynamically,
                  expand sponsorship performance, and capture higher fan spend from a single operating layer.
                </p>
                <div className="hero-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={startTonightRun}
                  >
                    Run tonight’s outlook
                  </button>
                  <button type="button" className="secondary-button" onClick={() => { setActivePage('Executive Demo Walkthrough'); setSelectedScenario(scenarioTiles[0]) }}>
                    Executive Demo Walkthrough
                  </button>
                  <button type="button" className="secondary-button" onClick={() => setActivePage('How The Agents Work Together')}>
                    How The Agents Work Together
                  </button>
                </div>
              </div>

              <div className="hero-summary">
                <div className="summary-badge">Board view</div>
                <div className="summary-line">
                  <span>Projected revenue</span>
                  <strong>$94.2M</strong>
                </div>
                <div className="summary-line">
                  <span>Opportunity pipeline</span>
                  <strong>$8.7M</strong>
                </div>
                <div className="summary-line">
                  <span>Premium utilization</span>
                  <strong>74%</strong>
                </div>
                <div className="summary-line accent">
                  <span>Forecast accuracy</span>
                  <strong>96.4%</strong>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              {heroStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <em>{stat.delta}</em>
                </article>
              ))}
            </div>

            <div className="two-column">
              <div className="panel">
                <SectionHeader
                  eyebrow="Revenue opportunity pipeline"
                  title="Open opportunities"
                  description="High-confidence actions being actively evaluated by revenue teams."
                />
                <div className="list-stack">
                  {opportunities.map((item) => (
                    <div key={item.title} className="list-item">
                      <div>
                        <h3>{item.title}</h3>
                        <small>{item.agent}</small>
                      </div>
                      <div className="item-metrics">
                        <span>{item.impact}</span>
                        <span>{item.priority}</span>
                        <span>{item.confidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <SectionHeader
                  eyebrow="Executive summary"
                  title="Operating priorities"
                  description="The platform is coordinating the highest-value moves across the venue ecosystem."
                />
                <div className="briefing-list">
                  {executiveBriefing.map((brief) => (
                    <div key={brief.title} className="brief-item">
                      <h3>{brief.title}</h3>
                      <p>{brief.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {pageKey === 'opportunities' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Revenue opportunity center"
              title="Open opportunities"
              description="Every opportunity is ranked by revenue impact, execution risk, and expected upside."
            />
            <div className="opportunity-grid">
              {opportunities.map((item) => (
                <article key={item.title} className="opportunity-card">
                  <span className="pill priority">{item.priority}</span>
                  <h3>{item.title}</h3>
                  <div className="big-number">{item.impact}</div>
                  <ul>
                    <li>Agent: {item.agent}</li>
                    <li>Confidence: {item.confidence}</li>
                    <li>Status: {item.status}</li>
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'forecasting' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Demand forecasting center"
              title="Upcoming events and attendance projections"
              description="AI models are forecasting demand, attendance, and expected revenue per event."
            />
            <div className="forecast-grid">
              {forecastEvents.map((event) => (
                <article key={event.name} className="forecast-card">
                  <div className="row-between">
                    <h3>{event.name}</h3>
                    <span className="trend-up">{event.trend}</span>
                  </div>
                  <div className="metric-row">
                    <span>Attendance</span>
                    <strong>{event.attendance}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Demand</span>
                    <strong>{event.demand}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Revenue</span>
                    <strong>{event.revenue}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'pricing' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Dynamic pricing center"
              title="Pricing recommendations"
              description="The system compares current ticket pricing to recommended scenarios and projected revenue uplift."
            />
            <div className="pricing-grid">
              {pricingScenarios.map((item) => (
                <article key={item.label} className="price-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <em>{item.change}</em>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'sponsorship' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Sponsorship intelligence center"
              title="Inventory utilization and growth"
              description="Sponsor inventory is being matched to higher-performing activation opportunities."
            />
            <div className="inventory-grid">
              {sponsorshipInventory.map((asset) => (
                <article key={asset.asset} className="inventory-card">
                  <h3>{asset.asset}</h3>
                  <div className="progress-bar">
                    <span style={{ width: asset.utilization }} />
                  </div>
                  <div className="row-between compact">
                    <span>Utilization</span>
                    <strong>{asset.utilization}</strong>
                  </div>
                  <div className="row-between compact">
                    <span>Revenue</span>
                    <strong>{asset.revenue}</strong>
                  </div>
                  <small>{asset.status}</small>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'monetization' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Fan monetization center"
              title="Fan segments and AI-generated recommendations"
              description="Personalized offers are being tuned to maximize spend without eroding experience quality."
            />
            <div className="fan-grid">
              {fanSegments.map((segment) => (
                <article key={segment.segment} className="fan-card">
                  <h3>{segment.segment}</h3>
                  <div className="metric-row">
                    <span>Spend</span>
                    <strong>{segment.spend}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Offer</span>
                    <strong>{segment.offer}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Lift</span>
                    <strong>{segment.likelyLift}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'intelligence' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Executive intelligence center"
              title="Business recommendations"
              description="Leadership is seeing a single operational narrative across revenue, demand, and profitability."
            />
            <div className="briefing-grid">
              {executiveBriefing.map((item) => (
                <article key={item.title} className="briefing-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'walkthrough' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Executive demo walkthrough"
              title="Scenario-based revenue narratives"
              description="Each tile narrates how the agents collaborate to unlock value across the venue operating model."
            />
            <div className="scenario-layout">
              <div className="scenario-grid">
                {scenarioTiles.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className={scenario.id === selectedScenario.id ? 'scenario-tile active' : 'scenario-tile'}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <span>{scenario.title}</span>
                  </button>
                ))}
              </div>

              <div className="scenario-detail panel">
                <div className="row-between">
                  <div>
                    <span className="eyebrow">{selectedScenario.title}</span>
                    <h3>{selectedScenario.subtitle}</h3>
                  </div>
                  <span className="pill accent">Live scenario</span>
                </div>
                <ul className="story-list">
                  {selectedScenario.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
                <p>{selectedScenario.narrative}</p>
                <div className="result-box">{selectedScenario.result}</div>
              </div>
            </div>
          </section>
        )}

        {pageKey === 'agents' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="How the agents work together"
              title="Collaborative revenue orchestration"
              description="Click each agent to review its inputs, outputs, decisions, and recommended actions."
            />
            <div className="agent-layout">
              <div className="agent-list">
                {Object.entries(agents).map(([key, agent]) => (
                  <button
                    key={key}
                    type="button"
                    className={selectedAgent === key ? 'agent-option active' : 'agent-option'}
                    onClick={() => setSelectedAgent(key)}
                  >
                    {agent.title}
                  </button>
                ))}
              </div>

              <div className="agent-detail panel">
                <h3>{currentAgent.title}</h3>
                <div className="detail-columns">
                  <div>
                    <h4>Inputs</h4>
                    <ul>
                      {currentAgent.inputs.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Outputs</h4>
                    <ul>
                      {currentAgent.outputs.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Decisions</h4>
                    <ul>
                      {currentAgent.decisions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Recommended actions</h4>
                    <ul>
                      {currentAgent.actions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="impact-box">Business impact: {currentAgent.impact}</div>
              </div>
            </div>
          </section>
        )}

        {pageKey === 'architecture' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Reference architecture"
              title="How this could be powered on Microsoft Cloud"
              description="This demo runs entirely on simulated, local data. In production, the same experience could connect ticketing, loyalty, CRM, POS, merchandise, and media engagement data through Microsoft Cloud."
            />
            <div className="architecture-layout">
              <div className="architecture-flow">
                {architectureNodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className={selectedArchitecture.id === node.id ? 'architecture-node active' : 'architecture-node'}
                    onClick={() => setSelectedArchitecture(node)}
                  >
                    {node.label}
                  </button>
                ))}
              </div>
              <div className="panel architecture-panel">
                <h3>{architectureDetail.label}</h3>
                <p>{architectureDetail.role}</p>
              </div>
            </div>
            <div className="cloud-flow">
              <span>Data in: ticketing · loyalty · CRM · POS · merchandise · media engagement</span>
              <b>→</b>
              <span>Agents: inventory → pricing → affinity → offer → revenue</span>
              <b>→</b>
              <span>Value out: upgrades · upsell · loyalty · executive reporting</span>
            </div>
          </section>
        )}

        {pageKey === 'kpis' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="KPI dashboard"
              title="Measurable business outcomes"
              description="Executive-grade performance metrics across revenue, demand, profitability, and fan experience."
            />
            <div className="kpi-grid">
              {kpiCards.map((item) => (
                <article key={item.label} className="kpi-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <em>{item.trend === 'up' ? '▲ Strong momentum' : '▼ Watchlist'}</em>
                </article>
              ))}
            </div>
          </section>
        )}

        {pageKey === 'outcomes' && (
          <section className="page-block">
            <SectionHeader
              eyebrow="Business outcomes page"
              title="Executive outcomes"
              description="The venue is realizing measurable gains in revenue, profit, lifecycle value, and strategic visibility."
            />
            <div className="outcomes-grid">
              {businessOutcomes.map((outcome) => (
                <div key={outcome} className="outcome-pill">
                  {outcome}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bottom-bar">
        <span>Technology stack</span>
        <div className="stack-list">
          {techStack.map((item) => (
            <span key={item} className="stack-item">{item}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
