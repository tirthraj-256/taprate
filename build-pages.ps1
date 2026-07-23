# TapRate Website Builder
$root = "C:\Users\tirth\Downloads\Taprate Website"

function Ensure-Dir($p) { if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null } }

function Page($depth, $page, $title, $desc, $canonical, $crumb, $h1, $hero, $body) {
  $pre = if ($depth -eq 0) { "" } else { "../" * $depth }
  @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$title</title>
<meta name="description" content="$desc">
<link rel="canonical" href="$canonical">
<meta property="og:title" content="$title">
<meta property="og:description" content="$desc">
<meta property="og:url" content="$canonical">
<link rel="stylesheet" href="${pre}css/main.css">
</head>
<body data-page="$page">
<div id="site-header"></div>
<section class="page-hero"><div class="container">
<nav class="breadcrumb">$crumb</nav>
<h1>$h1</h1>
<p>$hero</p>
</div></section>
$body
<section class="section"><div class="container reveal"><div class="cta-banner">
<h2>Ready to Go Smart with TapRate?</h2>
<p>Free design preview within 24 hours. No subscriptions. Made in Ahmedabad.</p>
<div class="btn-group"><a href="${pre}enquiry.html" class="btn btn--primary btn--lg">Get My Custom NFC Card →</a><a href="tel:+918401625979" class="btn btn--outline btn--lg">+91 8401625979</a></div>
</div></div></section>
<div id="site-footer"></div>
<script src="${pre}js/components.js"></script>
<script src="${pre}js/main.js"></script>
</body>
</html>
"@
}

# PRODUCTS
Ensure-Dir "$root\products"
$products = @(
  @{s="nfc-smart-business-card";t="NFC Smart Business Card";d="Premium PVC NFC business card with chip and QR backup. Share your digital profile with one tap. From Rs 199. Made in Ahmedabad.";p="199";tag="Best Seller"},
  @{s="metal-nfc-business-card";t="Metal NFC Business Card";d="Laser-engraved stainless steel NFC card for executives. Premium, water-resistant. From Rs 999. TapRate Ahmedabad.";p="999";tag="Premium"},
  @{s="google-review-nfc-standee";t="Google Review NFC Standee";d="Acrylic counter standee with NFC and QR opens Google review page instantly. Custom branded from Rs 799.";p="799";tag="Top Rated"},
  @{s="google-review-nfc-card";t="Google Review NFC Card";d="Pocket review card for staff handout at checkout. Branded NFC review collection from Rs 349.";p="349";tag="Review"},
  @{s="corporate-team-bundle";t="Corporate Team Bundle";d="Bulk NFC card rollout for teams 10-500+. GST invoicing, uniform branding, dedicated support.";p="0";tag="Enterprise"}
)
foreach ($pr in $products) {
  $price = if ($pr.p -eq "0") { "Custom Quote" } else { "From Rs $($pr.p)" }
  $body = "<section class=`"section`"><div class=`"container two-col`"><div class=`"reveal`"><span class=`"eyebrow`">$($pr.tag)</span><h2>$($pr.t)</h2><p style=`"margin:1rem 0;color:var(--color-gray-500)`">$($pr.d) TapRate manufactures every unit in-house at our South Bopal, Ahmedabad facility with free design support and lifetime reprogramming.</p><ul style=`"display:flex;flex-direction:column;gap:.75rem;margin:1.5rem 0`"><li>NFC + QR dual technology</li><li>Custom logo and brand printing</li><li>No app required</li><li>Works on iPhone and Android</li><li>Reprogrammable NFC chip</li><li>Pan-India delivery</li></ul><p><strong style=`"font-size:1.25rem;color:var(--color-primary)`">$price</strong></p></div><div class=`"reveal`"><form data-form style=`"background:var(--color-gray-50);padding:2rem;border-radius:var(--radius-xl)`"><h3>Order $($pr.t)</h3><div class=`"form-group`"><label class=`"form-label`">Name *</label><input class=`"form-input`" required></div><div class=`"form-group`"><label class=`"form-label`">Phone *</label><input class=`"form-input`" type=`"tel`" required></div><div class=`"form-group`"><label class=`"form-label`">Quantity</label><select class=`"form-select`"><option>1-5</option><option>6-10</option><option>11-25</option><option>25+</option></select></div><button type=`"submit`" class=`"btn btn--primary`" style=`"width:100%`">Get My Custom NFC Card →</button></form></div></div></section>"
  $html = Page 1 "products" "$($pr.t) | TapRate Ahmedabad" $pr.d "https://www.taprate.in/products/$($pr.s).html" "<a href=`"../index.html`">Home</a> <span>/</span> <a href=`"../products.html`">Products</a> <span>/</span> $($pr.t)" $pr.t $pr.d $body
  Set-Content "$root\products\$($pr.s).html" $html -Encoding UTF8
}

# SERVICES
Ensure-Dir "$root\services"
$services = @(
  @{s="nfc-business-cards";t="NFC Business Card Printing";d="Custom NFC business card design, printing, and programming in Ahmedabad. PVC and metal. Free design from Rs 199."},
  @{s="google-review-stands";t="Google Review Stand Design";d="Custom Google review NFC standees for restaurants, salons, and retail. Boost local SEO from Rs 799."},
  @{s="digital-networking";t="Digital Networking Solutions";d="Complete digital identity packages with NFC cards, profile pages, and link hubs for Ahmedabad businesses."},
  @{s="corporate-branding";t="Corporate Branding Solutions";d="Team NFC card rollouts, promotional products, and brand-compliant manufacturing for Gujarat corporates."},
  @{s="custom-nfc-manufacturing";t="Custom NFC Manufacturing";d="Bespoke NFC products - custom shapes, materials, and programming. Made in South Bopal, Ahmedabad."}
)
foreach ($sv in $services) {
  $body = "<section class=`"section`"><div class=`"container reveal`"><h2>$($sv.t) by TapRate</h2><p style=`"margin:1rem 0 2rem;color:var(--color-gray-500);max-width:760px`">$($sv.d) Based in Garden Residency, South Bopal, we serve businesses across Satellite, Prahladnagar, SG Highway, and all of Gujarat with 3-5 day turnaround.</p><div class=`"process-grid`"><div class=`"process-step`"><h3>Consult</h3><p>Share requirements via call, WhatsApp, or enquiry form.</p></div><div class=`"process-step`"><h3>Design</h3><p>Free mockup within 24 hours with unlimited revisions.</p></div><div class=`"process-step`"><h3>Manufacture</h3><p>In-house printing, NFC embedding, and QC testing.</p></div><div class=`"process-step`"><h3>Deliver</h3><p>Tracked shipping across Ahmedabad and India.</p></div></div></div></section>"
  $html = Page 1 "services" "$($sv.t) | TapRate" $sv.d "https://www.taprate.in/services/$($sv.s).html" "<a href=`"../index.html`">Home</a> <span>/</span> <a href=`"../services.html`">Services</a> <span>/</span> $($sv.t)" $sv.t $sv.d $body
  Set-Content "$root\services\$($sv.s).html" $html -Encoding UTF8
}

# LOCATIONS
Ensure-Dir "$root\locations"
$locs = @(
  @{s="ahmedabad";t="NFC Business Cards in Ahmedabad";d="TapRate is Ahmedabad's trusted NFC manufacturer based in South Bopal. Same-week delivery across all zones.";areas="Satellite, Prahladnagar, SG Highway, Vastrapur, Navrangpura, Maninagar, Thaltej, Bodakdev"},
  @{s="south-bopal";t="NFC Cards in South Bopal";d="Visit TapRate at Garden Residency, South Bopal. Walk-in demos and fastest delivery in Bopal and Chittavan.";areas="Chittavan, Bopal, Gala Gymkhana Road, Shela"},
  @{s="gandhinagar";t="NFC Solutions in Gandhinagar";d="NFC business cards and review stands delivered to Gandhinagar, Infocity, and GIFT City within 2-3 days.";areas="Infocity, Kudasan, Sector 21, GIFT City"},
  @{s="vadodara";t="NFC Products in Vadodara";d="Premium NFC cards and review standees for Vadodara businesses. Pan-Gujarat shipping from Ahmedabad.";areas="Alkapuri, Fatehgunj, Gotri, Manjalpur"},
  @{s="surat";t="NFC Business Cards in Surat";d="NFC networking and review products for Surat textile, diamond, and retail sectors. Bulk GST orders available.";areas="Adajan, Vesu, Varachha, Ring Road"},
  @{s="rajkot";t="NFC Solutions in Rajkot";d="Custom NFC business cards and Google review standees shipped to Rajkot and Saurashtra from TapRate Ahmedabad.";areas="Kalawad Road, University Road, Raiya Road"}
)
foreach ($lo in $locs) {
  $body = "<section class=`"section`"><div class=`"container two-col reveal`"><div><h2>TapRate Serves $($lo.t -replace 'NFC.*in ','')</h2><p style=`"color:var(--color-gray-500);margin:1rem 0`">$($lo.d)</p><h3 style=`"margin:1.5rem 0 .75rem`">Areas Covered</h3><p style=`"color:var(--color-gray-500)`">$($lo.areas)</p><h3 style=`"margin:1.5rem 0 .75rem`">Popular Products</h3><ul><li><a href=`"../products/nfc-smart-business-card.html`">NFC Business Card</a> - from Rs 199</li><li><a href=`"../products/google-review-nfc-standee.html`">Review Standee</a> - from Rs 799</li></ul></div><div class=`"map-container`"><iframe src=`"https://maps.google.com/maps?q=South+Bopal+Ahmedabad&output=embed`" loading=`"lazy`" title=`"TapRate South Bopal`"></iframe></div></div></section>"
  $html = Page 1 "" "$($lo.t) | TapRate" $lo.d "https://www.taprate.in/locations/$($lo.s).html" "<a href=`"../index.html`">Home</a> <span>/</span> <a href=`"../locations.html`">Locations</a> <span>/</span> $($lo.s)" $lo.t $lo.d $body
  Set-Content "$root\locations\$($lo.s).html" $html -Encoding UTF8
}

# INDUSTRIES
Ensure-Dir "$root\industries"
$inds = @(
  @{s="restaurants-cafes";t="Restaurants and Cafes";i="Restaurants, cafes, and cloud kitchens use TapRate review standees to collect Google reviews at billing counters."},
  @{s="salons-spas";t="Salons and Spas";i="Salons place NFC review standees at reception and equip stylists with smart NFC cards."},
  @{s="real-estate";t="Real Estate";i="Agents share listings, WhatsApp, and contact details with one tap at property showings."},
  @{s="healthcare-clinics";t="Healthcare and Clinics";i="Clinics use contactless NFC standees for reviews, appointments, and information sharing."},
  @{s="corporate-teams";t="Corporate Teams";i="Bulk NFC card rollouts for sales, HR, and leadership teams with GST invoicing."},
  @{s="retail-shops";t="Retail Shops";i="Checkout review standees and packaging NFC stickers for retail review collection."},
  @{s="gyms-fitness";t="Gyms and Fitness";i="Front desk review collection and trainer NFC cards for referral networking."},
  @{s="freelancers-consultants";t="Freelancers and Consultants";i="Stand out at BNI and networking events with premium TapRate NFC cards."}
)
foreach ($in in $inds) {
  $body = "<section class=`"section`"><div class=`"container reveal`"><h2>NFC Solutions for $($in.t)</h2><p style=`"color:var(--color-gray-500);margin:1rem 0 2rem;max-width:720px`">$($in.i)</p><div class=`"card-grid`"><div class=`"card`"><div class=`"card__body`"><h3>Google Review Standee</h3><p class=`"card__desc`">Counter-ready review collection.</p><a href=`"../products/google-review-nfc-standee.html`" class=`"card__link`">From Rs 799</a></div></div><div class=`"card`"><div class=`"card__body`"><h3>NFC Business Card</h3><p class=`"card__desc`">One-tap digital networking.</p><a href=`"../products/nfc-smart-business-card.html`" class=`"card__link`">From Rs 199</a></div></div></div></div></section>"
  $html = Page 1 "industries" "NFC for $($in.t) | TapRate Ahmedabad" $in.i "https://www.taprate.in/industries/$($in.s).html" "<a href=`"../index.html`">Home</a> <span>/</span> <a href=`"../industries.html`">Industries</a> <span>/</span> $($in.t)" "NFC Solutions for $($in.t)" $in.i $body
  Set-Content "$root\industries\$($in.s).html" $html -Encoding UTF8
}

Write-Host "Generated all subpages."
