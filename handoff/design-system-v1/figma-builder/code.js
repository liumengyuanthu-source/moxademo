'use strict';
const COLLECTIONS = [{"name":"Moxa / Primitives","modes":["Value"],"variables":[{"name":"color/teal/500","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-teal)","value":"#008787"},{"name":"color/teal/700","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-teal-700)","value":"#006B6B"},{"name":"color/teal/100","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-teal-100)","value":"#E7F5F4"},{"name":"color/navy/800","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-navy)","value":"#082F49"},{"name":"color/cyan/400","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-cyan)","value":"#40CBD0"},{"name":"color/orange/400","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-orange)","value":"#F39A61"},{"name":"color/ink/900","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-ink)","value":"#162F3A"},{"name":"color/muted/600","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-muted)","value":"#637781"},{"name":"color/line/200","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-line)","value":"#D7E3E4"},{"name":"color/surface/050","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-surface)","value":"#F4F8F8"},{"name":"color/white","type":"COLOR","scopes":[],"codeSyntax":"var(--moxa-white)","value":"#FFFFFF"},{"name":"color/deep/800","type":"COLOR","scopes":[],"codeSyntax":"var(--rio-deep)","value":"#073F47"},{"name":"color/rio-ink/900","type":"COLOR","scopes":[],"codeSyntax":"var(--rio-ink)","value":"#102F3F"},{"name":"color/rio-text/600","type":"COLOR","scopes":[],"codeSyntax":"var(--rio-text)","value":"#536B72"},{"name":"color/rio-line/200","type":"COLOR","scopes":[],"codeSyntax":"var(--rio-line)","value":"#D5E3E4"},{"name":"color/rio-soft/050","type":"COLOR","scopes":[],"codeSyntax":"var(--rio-soft)","value":"#F2F7F7"}]},{"name":"Moxa / Semantic Color / Light","modes":["Light"],"variables":[{"name":"color/bg/page","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/white}"},{"name":"color/bg/surface","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-surface)","value":"{color/surface/050}"},{"name":"color/bg/brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/bg/brand-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/teal/700}"},{"name":"color/bg/subtle-brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-100)","value":"{color/teal/100}"},{"name":"color/text/primary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-ink)","value":"{color/ink/900}"},{"name":"color/text/secondary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-muted)","value":"{color/muted/600}"},{"name":"color/text/brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/text/on-brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/white}"},{"name":"color/border/default","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-line)","value":"{color/line/200}"},{"name":"color/border/brand","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/focus/ring","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-cyan)","value":"{color/cyan/400}"},{"name":"color/action/primary","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/action/primary-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/teal/700}"},{"name":"color/action/hero","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-orange)","value":"{color/orange/400}"}]},{"name":"Moxa / Semantic Color / Dark Campaign","modes":["Dark Campaign"],"variables":[{"name":"color/bg/page","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/deep/800}"},{"name":"color/bg/surface","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-surface)","value":"{color/navy/800}"},{"name":"color/bg/brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/bg/brand-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/cyan/400}"},{"name":"color/bg/subtle-brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-100)","value":"{color/deep/800}"},{"name":"color/text/primary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-ink)","value":"{color/white}"},{"name":"color/text/secondary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-muted)","value":"{color/teal/100}"},{"name":"color/text/brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/cyan/400}"},{"name":"color/text/on-brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/white}"},{"name":"color/border/default","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-line)","value":"{color/muted/600}"},{"name":"color/border/brand","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-teal)","value":"{color/cyan/400}"},{"name":"color/focus/ring","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-cyan)","value":"{color/cyan/400}"},{"name":"color/action/primary","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/action/primary-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/cyan/400}"},{"name":"color/action/hero","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-orange)","value":"{color/orange/400}"}]},{"name":"Moxa / Semantic Color / Inverse","modes":["Inverse"],"variables":[{"name":"color/bg/page","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/navy/800}"},{"name":"color/bg/surface","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-surface)","value":"{color/deep/800}"},{"name":"color/bg/brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/bg/brand-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/cyan/400}"},{"name":"color/bg/subtle-brand","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-100)","value":"{color/deep/800}"},{"name":"color/text/primary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-ink)","value":"{color/white}"},{"name":"color/text/secondary","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-muted)","value":"{color/teal/100}"},{"name":"color/text/brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/cyan/400}"},{"name":"color/text/on-brand","type":"COLOR","scopes":["TEXT_FILL"],"codeSyntax":"var(--moxa-white)","value":"{color/white}"},{"name":"color/border/default","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-line)","value":"{color/muted/600}"},{"name":"color/border/brand","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-teal)","value":"{color/cyan/400}"},{"name":"color/focus/ring","type":"COLOR","scopes":["STROKE_COLOR"],"codeSyntax":"var(--moxa-cyan)","value":"{color/cyan/400}"},{"name":"color/action/primary","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal)","value":"{color/teal/500}"},{"name":"color/action/primary-hover","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-teal-700)","value":"{color/cyan/400}"},{"name":"color/action/hero","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"codeSyntax":"var(--moxa-orange)","value":"{color/orange/400}"}]},{"name":"Moxa / Spacing","modes":["Value"],"variables":[{"name":"spacing/1","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-1)","value":4},{"name":"spacing/2","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-2)","value":8},{"name":"spacing/3","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-3)","value":12},{"name":"spacing/4","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-4)","value":16},{"name":"spacing/5","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-5)","value":24},{"name":"spacing/6","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-6)","value":32},{"name":"spacing/7","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-7)","value":48},{"name":"spacing/8","type":"FLOAT","scopes":["GAP"],"codeSyntax":"var(--moxa-space-8)","value":64}]},{"name":"Moxa / Radius","modes":["Value"],"variables":[{"name":"radius/sm","type":"FLOAT","scopes":["CORNER_RADIUS"],"codeSyntax":"var(--moxa-radius-1)","value":4},{"name":"radius/md","type":"FLOAT","scopes":["CORNER_RADIUS"],"codeSyntax":"var(--moxa-radius-2)","value":8},{"name":"radius/lg","type":"FLOAT","scopes":["CORNER_RADIUS"],"codeSyntax":"var(--moxa-radius-3)","value":12},{"name":"radius/pill","type":"FLOAT","scopes":["CORNER_RADIUS"],"codeSyntax":"var(--moxa-radius-pill)","value":999}]},{"name":"Moxa / Sizing","modes":["Value"],"variables":[{"name":"size/content/max","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-content)","value":1240},{"name":"size/control/sm","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-size-control-sm)","value":34},{"name":"size/control/md","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-size-control-md)","value":44},{"name":"size/control/lg","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-size-control-lg)","value":48},{"name":"size/icon/md","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-size-icon-md)","value":20},{"name":"size/touch/min","type":"FLOAT","scopes":["WIDTH_HEIGHT"],"codeSyntax":"var(--moxa-size-touch-min)","value":44}]},{"name":"Moxa / Typography / Desktop","modes":["Desktop"],"variables":[{"name":"type/display/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-display-size)","value":64},{"name":"type/h1/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h1-size)","value":56},{"name":"type/h2/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h2-size)","value":44},{"name":"type/h3/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h3-size)","value":20},{"name":"type/body-lg/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-lg-size)","value":18},{"name":"type/body/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-size)","value":16},{"name":"type/body-sm/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-sm-size)","value":14},{"name":"type/label/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-label-size)","value":12},{"name":"type/display/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-display-line)","value":65},{"name":"type/heading/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-heading-line)","value":60},{"name":"type/body/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-body-line)","value":25}]},{"name":"Moxa / Typography / Compact","modes":["Compact"],"variables":[{"name":"type/display/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-display-size)","value":44},{"name":"type/h1/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h1-size)","value":40},{"name":"type/h2/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h2-size)","value":32},{"name":"type/h3/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-h3-size)","value":20},{"name":"type/body-lg/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-lg-size)","value":18},{"name":"type/body/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-size)","value":16},{"name":"type/body-sm/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-body-sm-size)","value":14},{"name":"type/label/size","type":"FLOAT","scopes":["FONT_SIZE"],"codeSyntax":"var(--moxa-type-label-size)","value":12},{"name":"type/display/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-display-line)","value":47},{"name":"type/heading/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-heading-line)","value":43},{"name":"type/body/line","type":"FLOAT","scopes":["LINE_HEIGHT"],"codeSyntax":"var(--moxa-type-body-line)","value":25}]},{"name":"Moxa / Motion","modes":["Value"],"variables":[{"name":"motion/duration/fast","type":"FLOAT","scopes":[],"codeSyntax":"var(--moxa-motion-duration-fast)","value":150},{"name":"motion/duration/default","type":"FLOAT","scopes":[],"codeSyntax":"var(--moxa-motion-duration-default)","value":180},{"name":"motion/duration/disclosure","type":"FLOAT","scopes":[],"codeSyntax":"var(--moxa-motion-duration-disclosure)","value":300},{"name":"motion/easing/standard","type":"STRING","scopes":[],"codeSyntax":"var(--rio-ease)","value":"cubic-bezier(.22,.61,.36,1)"}]}];
const PAGE_NAMES = ["00 — Cover & Release Status","01 — Getting Started","02 — Principles & Brand Expression","03 — Foundations / Color","04 — Foundations / Typography","05 — Foundations / Grid & Spacing","06 — Foundations / Radius, Elevation & Motion","07 — Foundations / Iconography & Imagery","--- COMPONENTS ---","10 — Actions / Button & Link","11 — Inputs / Search, Text, Select & Consent","12 — Navigation / Header, Mega Menu & Breadcrumb","13 — Navigation / Anchor Nav & Floating Navigator","14 — Content / Labels, Badges, Alerts & Section Header","15 — Cards / Product, Resource, Application & Video","16 — Disclosure / Accordion, Tabs & Modal","17 — Data / Specification, Comparison & Search Results","18 — Media / Hero, Video & 360 Viewer","19 — Conversion / CTA, Lead Form & Footer","20 — AI / Ask AI and Moxa Advisor","--- PATTERNS & TEMPLATES ---","22 — Shared Shell Patterns","23 — Product Discovery Patterns","24 — Product Detail Patterns","25 — Campaign & Microsite Patterns","26 — Support, Manual & Media Patterns","27 — Page Templates / 12 Types","28 — Route Coverage / 13 Routes","29 — Accessibility & Content Guidance","30 — Sitecore Mapping & Governance","31 — Changelog & Open Decisions"];
const COMPONENT_DEFINITIONS = [{"id":"G-001","name":"Global Header","family":"Global shell","scope":"Global","selector":".moxa-global-header","states":["default","scrolled","menu-open","mobile"],"responsive":"two-row desktop;compact mobile","accessibility":"landmark;keyboard nav;Escape/outside-click/scroll close","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Global Header","status":"Approved PoC","specimenKind":"shell"},{"id":"G-002","name":"Brand Logo","family":"Global shell","scope":"Global","selector":".moxa-brand","states":["default","focus"],"responsive":"fixed desktop;scaled mobile","accessibility":"descriptive accessible name","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Brand","status":"Approved PoC","specimenKind":"shell"},{"id":"G-003","name":"Header Search","family":"Global shell","scope":"Global","selector":".moxa-search","states":["default","focus","filled"],"responsive":"fluid center column;full mobile row","accessibility":"label;focus ring;submit semantics","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Global Search","status":"Approved PoC","specimenKind":"shell"},{"id":"G-004","name":"Ask AI Toggle","family":"Global shell","scope":"Global","selector":"#moxaAiMode","states":["default","hover","focus","pressed"],"responsive":"fixed-height;label retained","accessibility":"button;aria-pressed;visible focus","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"Ask AI Toggle","status":"Approved PoC","specimenKind":"shell"},{"id":"G-005","name":"Utility Links","family":"Global shell","scope":"Global","selector":".moxa-utility-links","states":["default","hover","focus"],"responsive":"reduced set on compact","accessibility":"descriptive link text","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Utility Navigation","status":"Approved PoC","specimenKind":"shell"},{"id":"G-006","name":"Primary Navigation","family":"Global shell","scope":"Global","selector":".moxa-mainnav","states":["default","hover","focus","expanded"],"responsive":"horizontal desktop;mobile menu","accessibility":"menubar semantics;keyboard access","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Primary Navigation","status":"Approved PoC","specimenKind":"shell"},{"id":"G-007","name":"Mega Menu","family":"Global shell","scope":"Global","selector":".moxa-mega","states":["closed","open","focus-within"],"responsive":"contained desktop;stacked mobile","accessibility":"Escape/outside-click/scroll close;focus order","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Mega Menu","status":"Approved PoC","specimenKind":"shell"},{"id":"G-008","name":"Header Contact CTA","family":"Global shell","scope":"Global","selector":".moxa-header-action","states":["default","hover","focus"],"responsive":"right aligned;full-width mobile","accessibility":"44px target;white label on teal","page":"10 — Actions / Button & Link","sitecoreRendering":"Header Contact Action","status":"Approved PoC","specimenKind":"shell"},{"id":"G-009","name":"Breadcrumb","family":"Global shell","scope":"Global","selector":".moxa-breadcrumb","states":["default","hover","focus","current"],"responsive":"horizontal scroll on compact","accessibility":"nav label;current page;clickable ancestors","page":"12 — Navigation / Header, Mega Menu & Breadcrumb","sitecoreRendering":"Breadcrumb","status":"Approved PoC","specimenKind":"shell"},{"id":"G-010","name":"Global Footer","family":"Global shell","scope":"Global","selector":".moxa-global-footer","states":["default"],"responsive":"compact two-zone desktop;stacked mobile","accessibility":"footer landmark;logical focus order","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"Global Footer","status":"Approved PoC","specimenKind":"shell"},{"id":"G-011","name":"Social Icon Link","family":"Global shell","scope":"Global","selector":".moxa-social-list a","states":["default","hover","focus"],"responsive":"icon row;wrap on narrow screens","accessibility":"accessible platform name","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"Social Link","status":"Approved PoC","specimenKind":"shell"},{"id":"G-012","name":"Subscription Form","family":"Global shell","scope":"Global","selector":".moxa-subscribe-form","states":["default","focus","invalid","success"],"responsive":"inline desktop;stacked mobile","accessibility":"label;consent;status message","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"Stay Connected Form","status":"Approved PoC","specimenKind":"shell"},{"id":"G-013","name":"Locale Selector","family":"Global shell","scope":"Global","selector":"#moxaLocale","states":["default","focus","selected"],"responsive":"footer aligned;full mobile","accessibility":"visible label;default Global / English","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"Locale Selector","status":"Approved PoC","specimenKind":"shell"},{"id":"G-014","name":"Advisor Launcher","family":"Global shell","scope":"Global","selector":".moxa-advisor-launcher","states":["default","hover","focus","expanded"],"responsive":"fixed bottom corner","accessibility":"button name;aria-expanded","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"Advisor Launcher","status":"Approved PoC","specimenKind":"shell"},{"id":"G-015","name":"Advisor Panel","family":"Global shell","scope":"Global","selector":".moxa-advisor-panel","states":["closed","open","search","compare","validate"],"responsive":"side panel desktop;sheet mobile","accessibility":"dialog semantics;close;focus handling","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"Advisor Panel","status":"Approved PoC","specimenKind":"shell"},{"id":"F-001","name":"Button","family":"Actions","scope":"Shared","selector":".btn","states":["primary","secondary","hero","text × default","hover","focus","active","disabled"],"responsive":"content-width;full-width option","accessibility":"44px minimum target;visible focus","page":"10 — Actions / Button & Link","sitecoreRendering":"Button","status":"Needs consolidation","specimenKind":"action"},{"id":"F-002","name":"Text Link","family":"Actions","scope":"Shared","selector":".home-text-link","states":["default","hover","focus","visited"],"responsive":"inline;wrap","accessibility":"descriptive copy;visible focus","page":"10 — Actions / Button & Link","sitecoreRendering":"Text Link","status":"Approved PoC","specimenKind":"action"},{"id":"F-003","name":"Text Input","family":"Forms","scope":"Shared","selector":".moxa-lead-form input","states":["default","focus","filled","invalid","disabled"],"responsive":"two-column form;single compact","accessibility":"programmatic label;error association","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Text Field","status":"Approved PoC","specimenKind":"form"},{"id":"F-004","name":"Search Input","family":"Forms","scope":"Shared","selector":".manual-search-input","states":["default","focus","filled","results"],"responsive":"fluid","accessibility":"search landmark;clear feedback","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Search Field","status":"Approved PoC","specimenKind":"form"},{"id":"F-005","name":"Select","family":"Forms","scope":"Shared","selector":".moxa-lead-form select","states":["default","focus","selected","invalid","disabled"],"responsive":"two-column form;single compact","accessibility":"programmatic label;native keyboard","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Select Field","status":"Approved PoC","specimenKind":"form"},{"id":"F-006","name":"Textarea","family":"Forms","scope":"Shared","selector":".moxa-lead-form textarea","states":["default","focus","filled","invalid","disabled"],"responsive":"full form width","accessibility":"label;error;character guidance","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Textarea Field","status":"Approved PoC","specimenKind":"form"},{"id":"F-007","name":"Consent Checkbox","family":"Forms","scope":"Shared","selector":".moxa-lead-consent input","states":["unchecked","checked","focus","invalid","disabled"],"responsive":"wraps with copy","accessibility":"label wraps;44px interaction area","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Consent Field","status":"Approved PoC","specimenKind":"form"},{"id":"F-008","name":"Field Feedback","family":"Forms","scope":"Shared","selector":".moxa-lead-error","states":["helper","error","success"],"responsive":"below field","accessibility":"aria-describedby;status semantics","page":"11 — Inputs / Search, Text, Select & Consent","sitecoreRendering":"Field Message","status":"Approved PoC","specimenKind":"form"},{"id":"N-001","name":"Anchor Navigation","family":"Navigation","scope":"Shared","selector":".series-a-anchor","states":["default","active","sticky"],"responsive":"scrollable compact row","accessibility":"active indication not color-only","page":"13 — Navigation / Anchor Nav & Floating Navigator","sitecoreRendering":"Anchor Navigation","status":"Approved PoC","specimenKind":"navigation"},{"id":"N-002","name":"Floating Section Navigator","family":"Navigation","scope":"Homepage","selector":".section-rail","states":["default","active","hover","focus"],"responsive":"fixed desktop;hidden/reduced compact","accessibility":"labeled links;current section","page":"13 — Navigation / Anchor Nav & Floating Navigator","sitecoreRendering":"Section Navigator","status":"Approved PoC","specimenKind":"navigation"},{"id":"N-003","name":"Tabs","family":"Disclosure","scope":"Shared","selector":"[role=tablist]","states":["default","hover","focus","selected","disabled"],"responsive":"horizontal scroll compact","accessibility":"Arrow/Home/End keys;aria-selected","page":"16 — Disclosure / Accordion, Tabs & Modal","sitecoreRendering":"Tabs","status":"Approved PoC","specimenKind":"navigation"},{"id":"N-004","name":"Accordion","family":"Disclosure","scope":"Campaign","selector":".accordion-item","states":["closed","open","hover","focus"],"responsive":"single column","accessibility":"button semantics;aria-expanded;plus/minus","page":"16 — Disclosure / Accordion, Tabs & Modal","sitecoreRendering":"Accordion","status":"Approved PoC","specimenKind":"navigation"},{"id":"N-005","name":"Modal","family":"Disclosure","scope":"Microsite","selector":".rio-modal","states":["closed","open"],"responsive":"centered dialog;full viewport compact","accessibility":"dialog;Escape;close;focus return","page":"16 — Disclosure / Accordion, Tabs & Modal","sitecoreRendering":"Modal","status":"Approved PoC","specimenKind":"navigation"},{"id":"N-006","name":"Back to Top","family":"Navigation","scope":"Shared","selector":".back-to-top","states":["hidden","visible","hover","focus"],"responsive":"fixed edge","accessibility":"descriptive name;44px target","page":"13 — Navigation / Anchor Nav & Floating Navigator","sitecoreRendering":"Back To Top","status":"Approved PoC","specimenKind":"navigation"},{"id":"C-001","name":"Section Header","family":"Content","scope":"Shared","selector":".sec-head","states":["left","center × light","dark"],"responsive":"responsive max-width","accessibility":"logical heading level","page":"14 — Content / Labels, Badges, Alerts & Section Header","sitecoreRendering":"Section Header","status":"Approved PoC","specimenKind":"content"},{"id":"C-002","name":"Badge and Tag","family":"Content","scope":"Shared","selector":".state-pill","states":["neutral","brand","success","warning","legacy"],"responsive":"wrap row","accessibility":"text conveys state","page":"14 — Content / Labels, Badges, Alerts & Section Header","sitecoreRendering":"Badge","status":"Approved PoC","specimenKind":"content"},{"id":"C-003","name":"Alert","family":"Content","scope":"Shared","selector":".alert","states":["info","success","warning","error"],"responsive":"fluid","accessibility":"role based on urgency;icon plus text","page":"14 — Content / Labels, Badges, Alerts & Section Header","sitecoreRendering":"Alert","status":"Needs consolidation","specimenKind":"content"},{"id":"C-004","name":"Product Card","family":"Cards","scope":"Shared","selector":".product-card","states":["default","hover","focus","selected"],"responsive":"4/3/2/1 column","accessibility":"linked heading;alt text","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Product Card","status":"Approved PoC","specimenKind":"card"},{"id":"C-005","name":"Resource Card","family":"Cards","scope":"Shared","selector":".resource-card","states":["default","hover","focus"],"responsive":"4/3/2/1 column","accessibility":"resource type and action clear","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Resource Card","status":"Approved PoC","specimenKind":"card"},{"id":"C-006","name":"Application Card","family":"Cards","scope":"Shared","selector":".rio-application-grid article","states":["default","hover","focus"],"responsive":"2 columns desktop;1 compact","accessibility":"white heading over verified gradient","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Application Card","status":"Approved PoC","specimenKind":"card"},{"id":"C-007","name":"Video Card","family":"Cards","scope":"Video","selector":".video-card","states":["default","hover","focus","playing"],"responsive":"3/2/1 column","accessibility":"duration;title;thumbnail alt","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Video Card","status":"Approved PoC","specimenKind":"card"},{"id":"C-008","name":"Metric Card","family":"Cards","scope":"Shared","selector":".connectivity-stat","states":["rest","counting","complete"],"responsive":"3 row desktop;stacked compact","accessibility":"static final value in DOM","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Metric Card","status":"Approved PoC","specimenKind":"card"},{"id":"C-009","name":"Contact Service Card","family":"Cards","scope":"Shared","selector":".moxa-lead-service","states":["default"],"responsive":"stacked list","accessibility":"heading and description structure","page":"15 — Cards / Product, Resource, Application & Video","sitecoreRendering":"Contact Service Card","status":"Approved PoC","specimenKind":"card"},{"id":"D-001","name":"Specification Table","family":"Data","scope":"Shared","selector":".spec-table","states":["default","sticky-header","scroll"],"responsive":"horizontal scroll compact","accessibility":"caption;scope headers","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Specification Table","status":"Approved PoC","specimenKind":"data"},{"id":"D-002","name":"Comparison Table","family":"Data","scope":"AI Compare","selector":".compare-table","states":["default","difference-highlight"],"responsive":"horizontal scroll compact","accessibility":"caption;row/column headers;source links","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Comparison Table","status":"Approved PoC","specimenKind":"data"},{"id":"D-003","name":"Search Summary","family":"Data","scope":"Search","selector":".search-summary","states":["results","zero-results","loading"],"responsive":"fluid","accessibility":"result count announced","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Search Summary","status":"Approved PoC","specimenKind":"data"},{"id":"D-004","name":"Facet Filter","family":"Data","scope":"Search","selector":".search-filters","states":["checked","unchecked","disabled","zero-count"],"responsive":"sidebar desktop;drawer compact","accessibility":"fieldset/legend;counts","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Facet Filter","status":"Approved PoC","specimenKind":"data"},{"id":"D-005","name":"Search Result Card","family":"Data","scope":"Search","selector":".result-card","states":["best-match","default","hover","focus"],"responsive":"media row desktop;stacked compact","accessibility":"heading link;type label;alt text","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Search Result Card","status":"Approved PoC","specimenKind":"data"},{"id":"D-006","name":"Product Family Selector","family":"Data","scope":"Category","selector":".family-card","states":["default","hover","focus","selected"],"responsive":"grid responsive","accessibility":"selected state and link purpose","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Product Family Selector","status":"Approved PoC","specimenKind":"data"},{"id":"D-007","name":"Model Row","family":"Data","scope":"Series","selector":".series-a-model-row","states":["default","hover","focus","recommended"],"responsive":"row desktop;stacked compact","accessibility":"model name as heading;spec labels","page":"17 — Data / Specification, Comparison & Search Results","sitecoreRendering":"Model Row","status":"Approved PoC","specimenKind":"data"},{"id":"M-001","name":"Hero Family","family":"Media","scope":"Shared","selector":".hero","states":["home","category","series","model","campaign","microsite","video","manual","product-media"],"responsive":"split or image hero;compact variants","accessibility":"single h1;alt text;CTA order","page":"18 — Media / Hero, Video & 360 Viewer","sitecoreRendering":"Hero","status":"Needs variant normalization","specimenKind":"media"},{"id":"M-002","name":"Video Player","family":"Media","scope":"Video","selector":".video-player","states":["poster","playing","paused","ended"],"responsive":"16:9 responsive","accessibility":"native controls;captions guidance","page":"18 — Media / Hero, Video & 360 Viewer","sitecoreRendering":"Video Player","status":"Approved PoC","specimenKind":"media"},{"id":"M-003","name":"Playlist Item","family":"Media","scope":"Video","selector":".playlist-item","states":["default","hover","focus","current"],"responsive":"thumbnail row;compact","accessibility":"current item;duration;title","page":"18 — Media / Hero, Video & 360 Viewer","sitecoreRendering":"Playlist Item","status":"Approved PoC","specimenKind":"media"},{"id":"M-004","name":"360 Viewer Controls","family":"Media","scope":"Product media","selector":".viewer-controls","states":["idle","dragging","button","range","keyboard"],"responsive":"responsive product stage","accessibility":"keyboard controls;status announcement","page":"18 — Media / Hero, Video & 360 Viewer","sitecoreRendering":"Product 360 Viewer","status":"Approved PoC","specimenKind":"media"},{"id":"V-001","name":"CTA Band","family":"Conversion","scope":"Shared","selector":".cta-band","states":["light","brand","dark"],"responsive":"split desktop;stacked compact","accessibility":"heading and ordered actions","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"CTA Band","status":"Needs consolidation","specimenKind":"conversion"},{"id":"V-002","name":"Lead Capture","family":"Conversion","scope":"Campaign and Microsite","selector":".moxa-lead-layout","states":["default","invalid","submitting","success"],"responsive":"aside plus form;stacked compact","accessibility":"labels;errors;consent;status","page":"19 — Conversion / CTA, Lead Form & Footer","sitecoreRendering":"Lead Capture","status":"Approved PoC","specimenKind":"conversion"},{"id":"AI-001","name":"Chat Message","family":"AI","scope":"AI Compare","selector":".compare-message","states":["user","assistant","system","loading"],"responsive":"conversation column","accessibility":"speaker identity;logical order","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"AI Message","status":"Approved PoC","specimenKind":"ai"},{"id":"AI-002","name":"Source References","family":"AI","scope":"AI Compare","selector":".compare-sources","states":["default","hover","focus"],"responsive":"below answer","accessibility":"explicit source title and destination","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"AI Source Reference","status":"Approved PoC","specimenKind":"ai"},{"id":"AI-003","name":"Follow-up Prompt","family":"AI","scope":"AI Compare","selector":".compare-followup","states":["default","hover","focus"],"responsive":"wrap row","accessibility":"button text describes prompt","page":"20 — AI / Ask AI and Moxa Advisor","sitecoreRendering":"AI Follow-up Prompt","status":"Approved PoC","specimenKind":"ai"}];
const ROUTE_DEFINITIONS = [{"id":"R-01","type":"Homepage","file":"homepage.html","title":"Moxa — Reliable Networks, Sincere Service","sharedShell":true,"patterns":["Home Hero","Campaign Pop-up","AI-guided Search","Explore","Featured Product","Trending","Connectivity Metrics"],"unique":"Floating Section Navigator; animated metrics","template":"Homepage","status":"Complete"},{"id":"R-02","type":"Search Results","file":"search.html","title":"Moxa Search Results","sharedShell":true,"patterns":["Search Summary","Facets","Result Groups","Result Cards"],"unique":"Best Match; zero-result state","template":"Search Results Page","status":"Complete"},{"id":"R-03","type":"Product Category","file":"product-category-ethernet-switches.html","title":"Ethernet Switches | Moxa","sharedShell":true,"patterns":["Category Hero","Selection Guide","Family Grid","Comparison CTA","Resources"],"unique":"Product Family Selector","template":"Product Category Page","status":"Complete"},{"id":"R-04","type":"Product Series","file":"product-series-eds-4008.html","title":"EDS-4008 Series - Layer 2 Managed Switches | Moxa","sharedShell":true,"patterns":["Series Hero","Anchor Nav","Configurations","Models","Resources","Applications","CTA"],"unique":"EDS model finder and rows","template":"Product Series Page","status":"Complete"},{"id":"R-05","type":"Product Model","file":"eds-4008-lv.html","title":"EDS-4008-LV - Layer 2 Managed Switches | Moxa","sharedShell":true,"patterns":["Model Hero","Gallery","Specification Summary","Downloads","Related Models","Quote CTA"],"unique":"LV datasource","template":"Product Model Page","status":"Complete"},{"id":"R-06","type":"Product Model","file":"eds-4008-hv.html","title":"EDS-4008-HV - Layer 2 Managed Switches | Moxa","sharedShell":true,"patterns":["Model Hero","Gallery","Specification Summary","Downloads","Related Models","Quote CTA"],"unique":"HV datasource","template":"Product Model Page","status":"Complete"},{"id":"R-07","type":"Product Series","file":"nport-5100-series.html","title":"NPort 5100 Series - General Device Servers | Moxa","sharedShell":true,"patterns":["Series Hero","Anchor Nav","Models","Features","Resources","Applications","CTA"],"unique":"NPort datasource and serial-to-Ethernet content","template":"Product Series Page","status":"Complete"},{"id":"R-08","type":"Campaign","file":"campaign.html","title":"Industrial Network Security | Moxa","sharedShell":true,"patterns":["Campaign Hero","Sticky Nav","Accordion","Architecture Selector","Portfolio","Lead Capture"],"unique":"Security architecture controls","template":"Campaign Page","status":"Complete"},{"id":"R-09","type":"Microsite","file":"microsite.html","title":"Remote I/O Portfolio | Moxa","sharedShell":true,"patterns":["Compact Hero","Metrics","Tabs","Video","Feature Rows","Portfolio","Applications","Selection Guide","Lead Capture"],"unique":"Video/brochure modals; selection comparison","template":"Microsite Page","status":"Complete"},{"id":"R-10","type":"Video","file":"video.html","title":"Making Digital the New Current | Moxa Energy Transition","sharedShell":true,"patterns":["Breadcrumb","Video Hero","Featured Player","Playlist","Filters","Search","Video Grid"],"unique":"Five-part collection playlist","template":"Video Page","status":"Complete"},{"id":"R-11","type":"HXML Manual","file":"manual.html","title":"Moxa HXML Manual Page","sharedShell":true,"patterns":["Compact Banner","Manual Search","TOC","Content Blocks","Alerts","Tables","Downloads"],"unique":"HXML anchor navigation","template":"Manual Page","status":"Complete"},{"id":"R-12","type":"AI Comparison","file":"compare-lv-hv.html","title":"AI Model Comparison | EDS-4008-LV vs EDS-4008-HV | Moxa","sharedShell":true,"patterns":["Conversation Shell","Prompt","Assistant Answer","Comparison Table","Sources","Follow-ups"],"unique":"Source-linked AI response","template":"AI Comparison Page","status":"Complete"},{"id":"R-13","type":"Product Media","file":"product-360.html","title":"Moxa 360-degree Product Image","sharedShell":true,"patterns":["Product Media Hero","36-frame Viewer","Controls","Related Actions"],"unique":"drag/range/keyboard viewer","template":"Product Media Page","status":"Complete"}];
const SITECORE_MAPPINGS = [{"id":"SC-001","figmaPattern":"Global Header","implementation":".moxa-global-header","rendering":"Global Header","datasource":"Global Header Configuration","fields":"logo; search placeholder; Ask AI label; utility links; nav groups; contact CTA","behavior":"moxa-shell.js","analytics":"header_search_submit; ask_ai_toggle; primary_nav_open"},{"id":"SC-002","figmaPattern":"Mega Menu","implementation":".moxa-mega","rendering":"Mega Menu","datasource":"Navigation Group","fields":"intro; category cards; links; guide CTA","behavior":"moxa-shell.js","analytics":"mega_menu_open; mega_link_click"},{"id":"SC-003","figmaPattern":"Breadcrumb","implementation":".moxa-breadcrumb","rendering":"Breadcrumb","datasource":"Breadcrumb Configuration","fields":"display-name overrides; root label","behavior":"Sitecore hierarchy","analytics":"breadcrumb_click"},{"id":"SC-004","figmaPattern":"Global Footer","implementation":".moxa-global-footer","rendering":"Global Footer","datasource":"Global Footer Configuration","fields":"social links; subscription copy; legal links; locale options","behavior":"moxa-shell.js","analytics":"social_click; subscribe_submit; locale_change"},{"id":"SC-005","figmaPattern":"Moxa Advisor","implementation":".moxa-advisor-panel","rendering":"Moxa Advisor","datasource":"Advisor Configuration","fields":"welcome copy; quick actions; bot identity; handoff links","behavior":"AI integration service","analytics":"advisor_open; advisor_prompt; advisor_handoff"},{"id":"SC-006","figmaPattern":"Hero Family","implementation":".hero","rendering":"Hero","datasource":"Hero Content","fields":"eyebrow; title; description; image; image alt; CTA set; theme; alignment","behavior":"rendering parameters","analytics":"hero_cta_click"},{"id":"SC-007","figmaPattern":"Section Header","implementation":".sec-head","rendering":"Section Header","datasource":"Section Header","fields":"eyebrow; title; description; alignment; theme","behavior":"none","analytics":"section_view"},{"id":"SC-008","figmaPattern":"Button and CTA","implementation":".btn","rendering":"CTA Set","datasource":"CTA Set","fields":"label; destination; style; target; analytics label","behavior":"none","analytics":"cta_click"},{"id":"SC-009","figmaPattern":"Product Card","implementation":".product-card","rendering":"Product Card","datasource":"Product Reference","fields":"name; summary; image; badges; specifications; destination","behavior":"product data service","analytics":"product_card_click"},{"id":"SC-010","figmaPattern":"Resource Card","implementation":".resource-card","rendering":"Resource Card","datasource":"Resource","fields":"type; title; summary; thumbnail; file/link; metadata","behavior":"resource service","analytics":"resource_open; resource_download"},{"id":"SC-011","figmaPattern":"Application Card","implementation":".rio-application-grid article","rendering":"Application Card","datasource":"Application Story","fields":"title; summary; image; image alt; industry; destination","behavior":"none","analytics":"application_card_click"},{"id":"SC-012","figmaPattern":"Video Card","implementation":".video-card","rendering":"Video Card","datasource":"Video Item","fields":"title; summary; thumbnail; duration; category; video URL","behavior":"video service","analytics":"video_select; video_play"},{"id":"SC-013","figmaPattern":"Metric Card","implementation":".connectivity-stat","rendering":"Metric","datasource":"Metric","fields":"value; suffix; label; source; animation enabled","behavior":"moxa-shell.js","analytics":"metric_view"},{"id":"SC-014","figmaPattern":"Anchor Navigation","implementation":".series-a-anchor","rendering":"Anchor Navigation","datasource":"Anchor Navigation Configuration","fields":"anchor labels; target IDs; optional CTAs","behavior":"scroll observer","analytics":"anchor_click"},{"id":"SC-015","figmaPattern":"Floating Navigator","implementation":".section-rail","rendering":"Floating Section Navigator","datasource":"Section Navigation Configuration","fields":"section labels; target IDs; initial section","behavior":"scroll observer","analytics":"section_nav_click"},{"id":"SC-016","figmaPattern":"Tabs","implementation":"[role=tablist]","rendering":"Tabs","datasource":"Tab Collection","fields":"tab labels; tab panels; default tab","behavior":"page interaction module","analytics":"tab_change"},{"id":"SC-017","figmaPattern":"Accordion","implementation":".accordion-item","rendering":"Accordion","datasource":"Accordion Collection","fields":"title; body; optional image; default-open","behavior":"page interaction module","analytics":"accordion_toggle"},{"id":"SC-018","figmaPattern":"Modal","implementation":".rio-modal","rendering":"Modal Viewer","datasource":"Modal Configuration","fields":"title; body/media; close label; trigger label","behavior":"microsite-remote-io.js","analytics":"modal_open; modal_close"},{"id":"SC-019","figmaPattern":"Search Summary","implementation":".search-summary","rendering":"Search Summary","datasource":"Search Query Context","fields":"query; result count; active facets; sort","behavior":"Sitecore Search","analytics":"search_results_view"},{"id":"SC-020","figmaPattern":"Facet Filter","implementation":".search-filters","rendering":"Facet Filter","datasource":"Search Facet Configuration","fields":"facet labels; values; counts; ordering","behavior":"Sitecore Search","analytics":"facet_change"},{"id":"SC-021","figmaPattern":"Search Result Card","implementation":".result-card","rendering":"Search Result Card","datasource":"Search Result","fields":"type; title; summary; thumbnail; metadata; destination; rank","behavior":"Sitecore Search","analytics":"search_result_click"},{"id":"SC-022","figmaPattern":"Product Family Selector","implementation":".family-card","rendering":"Product Family Selector","datasource":"Product Family","fields":"name; summary; image; categories; destination","behavior":"product data service","analytics":"family_select"},{"id":"SC-023","figmaPattern":"Model Row","implementation":".series-a-model-row","rendering":"Product Model Row","datasource":"Product Model","fields":"model name; power; ports; temperature; certifications; destination","behavior":"product data service","analytics":"model_select"},{"id":"SC-024","figmaPattern":"Specification Table","implementation":".spec-table","rendering":"Specification Table","datasource":"Specification Collection","fields":"groups; rows; labels; values; notes","behavior":"product data service","analytics":"specification_view"},{"id":"SC-025","figmaPattern":"Comparison Table","implementation":".compare-table","rendering":"Comparison Table","datasource":"Comparison Dataset","fields":"models; attributes; values; difference flags; sources","behavior":"product data service","analytics":"compare_view; compare_source_click"},{"id":"SC-026","figmaPattern":"Video Player","implementation":".video-player","rendering":"Video Player","datasource":"Video Item","fields":"poster; video URL; captions URL; title; duration","behavior":"video service","analytics":"video_play; video_complete"},{"id":"SC-027","figmaPattern":"360 Viewer","implementation":".viewer-controls","rendering":"Product 360 Viewer","datasource":"Product Media Set","fields":"frame list; fallback image; alt text; initial frame; controls","behavior":"product media module","analytics":"viewer_drag; viewer_rotate; viewer_frame"},{"id":"SC-028","figmaPattern":"Lead Capture","implementation":".moxa-lead-layout","rendering":"Lead Capture","datasource":"Lead Form Configuration","fields":"service copy; first name; email; company; industry; country; project details; consent","behavior":"moxa-lead-form.js plus CRM service","analytics":"lead_start; lead_error; lead_submit; lead_success"},{"id":"SC-029","figmaPattern":"Manual Search","implementation":".manual-search-input","rendering":"Manual Search","datasource":"Manual Metadata","fields":"placeholder; index scope; zero-result copy","behavior":"manual search module","analytics":"manual_search; manual_result_click"},{"id":"SC-030","figmaPattern":"AI Conversation","implementation":".compare-message","rendering":"AI Comparison Response","datasource":"AI Prompt and Response","fields":"prompt; summary; table; sources; follow-ups; disclosure","behavior":"governed AI service","analytics":"ai_prompt; ai_source_click; ai_followup"}];
const TEXT_STYLES = [{"name":"Display / Hero","style":"Extra Bold","size":64,"lineHeight":65,"letterSpacing":-2.2},{"name":"Heading / H1","style":"Bold","size":56,"lineHeight":60,"letterSpacing":-1.6},{"name":"Heading / H2","style":"Bold","size":44,"lineHeight":48,"letterSpacing":-1.1},{"name":"Heading / H3","style":"Bold","size":28,"lineHeight":34,"letterSpacing":-0.4},{"name":"Heading / Section","style":"Bold","size":36,"lineHeight":42,"letterSpacing":-0.8},{"name":"Heading / Card","style":"Bold","size":20,"lineHeight":26,"letterSpacing":-0.1},{"name":"Body / Large","style":"Regular","size":18,"lineHeight":28,"letterSpacing":0},{"name":"Body / Default","style":"Regular","size":16,"lineHeight":25,"letterSpacing":0},{"name":"Body / Small","style":"Regular","size":14,"lineHeight":21,"letterSpacing":0},{"name":"Label / Eyebrow","style":"Bold","size":12,"lineHeight":16,"letterSpacing":2.4,"textCase":"UPPER"},{"name":"Label / Navigation","style":"Semi Bold","size":14,"lineHeight":20,"letterSpacing":0},{"name":"Data / Metric","style":"Light","size":48,"lineHeight":54,"letterSpacing":-1.2},{"name":"Utility / Caption","style":"Medium","size":12,"lineHeight":18,"letterSpacing":0}];
const EFFECT_STYLES = [{"name":"Elevation / Panel","effects":[{"type":"DROP_SHADOW","color":{"r":0.03137254901960784,"g":0.1843137254901961,"b":0.28627450980392155,"a":0.14},"offset":{"x":0,"y":20},"radius":60,"spread":0,"visible":true,"blendMode":"NORMAL"}]},{"name":"Elevation / Floating","effects":[{"type":"DROP_SHADOW","color":{"r":0.03137254901960784,"g":0.1843137254901961,"b":0.28627450980392155,"a":0.18},"offset":{"x":0,"y":12},"radius":32,"spread":0,"visible":true,"blendMode":"NORMAL"}]},{"name":"Surface / Glass","effects":[{"type":"BACKGROUND_BLUR","radius":24,"visible":true}]}];
const GRID_STYLES = [{"name":"Grid / Desktop / 4 Column","grid":{"pattern":"COLUMNS","alignment":"STRETCH","gutterSize":32,"count":4,"offset":0,"visible":true,"color":{"r":0,"g":0.5294117647058824,"b":0.5294117647058824,"a":0.08}}},{"name":"Grid / Tablet / 4 Column","grid":{"pattern":"COLUMNS","alignment":"STRETCH","gutterSize":24,"count":4,"offset":0,"visible":true,"color":{"r":0,"g":0.5294117647058824,"b":0.5294117647058824,"a":0.08}}},{"name":"Grid / Mobile / 4 Column","grid":{"pattern":"COLUMNS","alignment":"STRETCH","gutterSize":16,"count":4,"offset":0,"visible":true,"color":{"r":0,"g":0.5294117647058824,"b":0.5294117647058824,"a":0.08}}}];
(function pluginRuntime() {
  const RUN_ID = 'moxa-ds-v1-20260720';
  const NS = 'moxa_ds';
  const FONT = 'Inter';
  const color = {
    teal: { r: 0, g: 135 / 255, b: 135 / 255 },
    tealDark: { r: 0, g: 107 / 255, b: 107 / 255 },
    tealSoft: { r: 231 / 255, g: 245 / 255, b: 244 / 255 },
    navy: { r: 8 / 255, g: 47 / 255, b: 73 / 255 },
    cyan: { r: 64 / 255, g: 203 / 255, b: 208 / 255 },
    orange: { r: 243 / 255, g: 154 / 255, b: 97 / 255 },
    ink: { r: 22 / 255, g: 47 / 255, b: 58 / 255 },
    muted: { r: 99 / 255, g: 119 / 255, b: 129 / 255 },
    line: { r: 215 / 255, g: 227 / 255, b: 228 / 255 },
    surface: { r: 244 / 255, g: 248 / 255, b: 248 / 255 },
    white: { r: 1, g: 1, b: 1 }
  };

  const solid = (rgb, opacity = 1) => ({ type: 'SOLID', color: rgb, opacity });
  const hexToRgb = value => {
    const clean = value.replace('#', '');
    return {
      r: parseInt(clean.slice(0, 2), 16) / 255,
      g: parseInt(clean.slice(2, 4), 16) / 255,
      b: parseInt(clean.slice(4, 6), 16) / 255
    };
  };

  async function loadFonts() {
    const styles = ['Light', 'Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
    for (const style of styles) await figma.loadFontAsync({ family: FONT, style });
  }

  function tag(node, phase, key) {
    node.setSharedPluginData(NS, 'run_id', RUN_ID);
    node.setSharedPluginData(NS, 'phase', phase);
    node.setSharedPluginData(NS, 'key', key);
  }

  function textNode(characters, options = {}) {
    const node = figma.createText();
    const style = options.style || 'Regular';
    node.fontName = { family: FONT, style };
    node.characters = characters;
    node.fontSize = options.size || 16;
    node.lineHeight = { unit: 'PIXELS', value: options.lineHeight || Math.round((options.size || 16) * 1.45) };
    node.letterSpacing = { unit: 'PIXELS', value: options.letterSpacing || 0 };
    node.fills = [solid(options.color || color.ink)];
    if (options.textCase) node.textCase = options.textCase;
    node.textAutoResize = 'HEIGHT';
    if (options.width) node.resize(options.width, node.height);
    return node;
  }

  function applyAutoLayoutSizing(node, direction, width) {
    if (width) node.resize(width, Math.max(node.height, 1));
    node.layoutMode = direction;
    if (direction === 'HORIZONTAL') {
      node.primaryAxisSizingMode = width ? 'FIXED' : 'AUTO';
      node.counterAxisSizingMode = 'AUTO';
    } else {
      node.primaryAxisSizingMode = 'AUTO';
      node.counterAxisSizingMode = width ? 'FIXED' : 'AUTO';
    }
  }

  function autoFrame(name, direction = 'VERTICAL', options = {}) {
    const frame = figma.createFrame();
    frame.name = name;
    applyAutoLayoutSizing(frame, direction, options.width);
    frame.paddingTop = options.padding ?? 24;
    frame.paddingRight = options.padding ?? 24;
    frame.paddingBottom = options.padding ?? 24;
    frame.paddingLeft = options.padding ?? 24;
    frame.itemSpacing = options.gap ?? 16;
    frame.cornerRadius = options.radius ?? 8;
    frame.fills = [solid(options.fill || color.white, options.opacity ?? 1)];
    if (options.stroke) {
      frame.strokes = [solid(options.stroke)];
      frame.strokeWeight = 1;
    }
    return frame;
  }

  function appendFill(parent, child) {
    parent.appendChild(child);
    child.layoutAlign = 'STRETCH';
    return child;
  }

  function chip(label, fill = color.tealSoft, ink = color.tealDark) {
    const frame = autoFrame(`Chip / ${label}`, 'HORIZONTAL', { padding: 8, gap: 4, radius: 999, fill });
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.appendChild(textNode(label, { size: 12, lineHeight: 16, style: 'Semi Bold', color: ink }));
    return frame;
  }

  async function ensureCollections() {
    const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
    const localVariables = await figma.variables.getLocalVariablesAsync();
    const primitiveMap = {};
    const output = {};
    for (const definition of COLLECTIONS) {
      let collection = localCollections.find(item => item.name === definition.name);
      if (!collection) collection = figma.variables.createVariableCollection(definition.name);
      const modeName = definition.modes[0];
      if (collection.modes[0].name !== modeName) collection.renameMode(collection.defaultModeId, modeName);
      const modeId = collection.modes[0].modeId;
      const collectionVariables = localVariables.filter(variable => variable.variableCollectionId === collection.id);
      output[definition.name] = { id: collection.id, variables: {} };
      for (const definitionVariable of definition.variables) {
        let variable = collectionVariables.find(item => item.name === definitionVariable.name);
        if (!variable) variable = figma.variables.createVariable(definitionVariable.name, collection, definitionVariable.type);
        variable.scopes = definitionVariable.scopes;
        variable.setVariableCodeSyntax('WEB', definitionVariable.codeSyntax);
        let value = definitionVariable.value;
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          const primitiveName = value.slice(1, -1);
          if (!primitiveMap[primitiveName]) throw new Error(`Missing primitive alias: ${primitiveName}`);
          value = figma.variables.createVariableAlias(primitiveMap[primitiveName]);
        } else if (definitionVariable.type === 'COLOR') {
          value = hexToRgb(value);
        }
        variable.setValueForMode(modeId, value);
        if (definition.name === 'Moxa / Primitives') primitiveMap[definitionVariable.name] = variable;
        output[definition.name].variables[definitionVariable.name] = variable.id;
      }
    }
    return output;
  }

  async function ensureStyles() {
    const localText = await figma.getLocalTextStylesAsync();
    const localEffects = await figma.getLocalEffectStylesAsync();
    const localGrids = await figma.getLocalGridStylesAsync();
    const output = { text: {}, effect: {}, grid: {} };
    for (const definition of TEXT_STYLES) {
      let style = localText.find(item => item.name === definition.name);
      if (!style) style = figma.createTextStyle();
      style.name = definition.name;
      style.fontName = { family: FONT, style: definition.style };
      style.fontSize = definition.size;
      style.lineHeight = { unit: 'PIXELS', value: definition.lineHeight };
      style.letterSpacing = { unit: 'PIXELS', value: definition.letterSpacing };
      if (definition.textCase) style.textCase = definition.textCase;
      style.description = 'Moxa PoC DS v1. Implementation font stack: Helvetica Neue, Helvetica, Arial; editable Figma fallback: Inter.';
      output.text[definition.name] = style.id;
    }
    for (const definition of EFFECT_STYLES) {
      let style = localEffects.find(item => item.name === definition.name);
      if (!style) style = figma.createEffectStyle();
      style.name = definition.name;
      style.effects = definition.effects;
      output.effect[definition.name] = style.id;
    }
    for (const definition of GRID_STYLES) {
      let style = localGrids.find(item => item.name === definition.name);
      if (!style) style = figma.createGridStyle();
      style.name = definition.name;
      style.layoutGrids = [definition.grid];
      output.grid[definition.name] = style.id;
    }
    return output;
  }

  async function ensurePages() {
    const map = {};
    const first = figma.root.children[0];
    if (first && first.name === 'Page 1' && !figma.root.children.some(page => page.name === PAGE_NAMES[0])) {
      await first.loadAsync();
      if (first.children.length === 0) first.name = PAGE_NAMES[0];
    }
    for (const name of PAGE_NAMES) {
      let page = figma.root.children.find(item => item.name === name);
      if (!page) {
        page = figma.createPage();
        page.name = name;
      }
      await page.loadAsync();
      tag(page, 'phase2', `page/${name}`);
      map[name] = page;
    }
    return map;
  }

  async function resetGeneratedCanvases(pages) {
    for (const page of Object.values(pages)) {
      await page.loadAsync();
      for (const node of [...page.children]) {
        if (node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`) node.remove();
      }
    }
  }

  function pageCanvas(page, description) {
    let canvas = page.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`);
    if (canvas) return canvas;
    canvas = autoFrame(`DS Canvas / ${page.name}`, 'VERTICAL', { width: 1440, padding: 64, gap: 32, radius: 0, fill: color.surface });
    canvas.x = 0;
    canvas.y = 0;
    tag(canvas, 'phase2', `canvas/${page.name}`);
    page.appendChild(canvas);
    appendFill(canvas, textNode(page.name, { size: 40, lineHeight: 46, style: 'Bold', color: color.ink }));
    appendFill(canvas, textNode(description, { size: 16, lineHeight: 25, color: color.muted, width: 1120 }));
    const rule = figma.createRectangle();
    rule.name = 'Moxa bond line';
    rule.resize(120, 4);
    rule.fills = [solid(color.teal)];
    canvas.appendChild(rule);
    return canvas;
  }

  function componentGallery(canvas) {
    let gallery = canvas.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `gallery/${canvas.parent.name}`);
    if (gallery) return gallery;
    gallery = autoFrame('Component gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 24, radius: 0, fill: color.surface });
    gallery.layoutWrap = 'WRAP';
    gallery.counterAxisSpacing = 24;
    tag(gallery, 'phase3', `gallery/${canvas.parent.name}`);
    appendFill(canvas, gallery);
    return gallery;
  }

  function addMetricRow(parent, metrics) {
    const row = autoFrame('Scope metrics', 'HORIZONTAL', { padding: 0, gap: 16, radius: 0, fill: color.surface });
    appendFill(parent, row);
    for (const metric of metrics) {
      const card = autoFrame(`Metric / ${metric.label}`, 'VERTICAL', { width: 250, padding: 20, gap: 8, radius: 8, fill: color.white, stroke: color.line });
      card.appendChild(textNode(metric.value, { size: 36, lineHeight: 40, style: 'Light', color: color.tealDark }));
      card.appendChild(textNode(metric.label, { size: 12, lineHeight: 16, style: 'Bold', color: color.muted, letterSpacing: 1.4, textCase: 'UPPER' }));
      row.appendChild(card);
    }
  }

  function gradientPaint(from, to) {
    return {
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { ...from, a: 1 } },
        { position: 1, color: { ...to, a: 1 } }
      ]
    };
  }

  function visualButton(label, style = 'primary') {
    const button = autoFrame(`Button / ${label}`, 'HORIZONTAL', { padding: 12, gap: 8, radius: 6, fill: style === 'secondary' ? color.white : color.teal, stroke: style === 'secondary' ? color.teal : null });
    if (style === 'ai') button.fills = [gradientPaint(color.tealDark, color.cyan)];
    button.primaryAxisAlignItems = 'CENTER'; button.counterAxisAlignItems = 'CENTER';
    button.appendChild(textNode(label, { size: 14, lineHeight: 20, style: 'Bold', color: style === 'secondary' ? color.tealDark : color.white }));
    return button;
  }

  function visualField(label, value, width = 480, state = 'default') {
    const stack = autoFrame(`Field / ${label}`, 'VERTICAL', { width, padding: 0, gap: 6, radius: 0, fill: color.white });
    if (label) appendFill(stack, textNode(label, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.ink }));
    const field = autoFrame('Input surface', 'HORIZONTAL', { width, padding: 12, gap: 10, radius: 6, fill: color.white, stroke: state === 'error' ? color.orange : (state === 'focus' ? color.cyan : color.line) });
    field.counterAxisAlignItems = 'CENTER';
    field.appendChild(textNode(value, { size: 14, lineHeight: 20, color: state === 'filled' ? color.ink : color.muted }));
    appendFill(stack, field);
    if (state === 'error') appendFill(stack, textNode('Please complete this field.', { size: 12, lineHeight: 18, color: color.orange }));
    return stack;
  }

  function visualArtwork(label, width = 360, height = 170) {
    const art = figma.createFrame();
    art.name = `Industrial image / ${label}`; art.resize(width, height); art.cornerRadius = 8; art.clipsContent = true;
    art.fills = [gradientPaint(color.navy, color.teal)];
    const title = textNode(label, { size: 18, lineHeight: 24, style: 'Bold', color: color.white, width: width - 40 });
    title.x = 20; title.y = height - 54; art.appendChild(title);
    for (let index = 0; index < 7; index += 1) {
      const dot = figma.createEllipse(); dot.name = 'Network node'; dot.resize(8 + (index % 3) * 3, 8 + (index % 3) * 3);
      dot.x = 26 + index * Math.max(34, Math.floor((width - 80) / 7)); dot.y = 28 + (index % 3) * 26;
      dot.fills = [solid(index % 2 ? color.cyan : color.white, 0.88)]; art.appendChild(dot);
    }
    return art;
  }

  function visualNav(items, active = 0, width = 680) {
    const nav = autoFrame('Navigation specimen', 'HORIZONTAL', { width, padding: 14, gap: 28, radius: 6, fill: color.white, stroke: color.line });
    nav.counterAxisAlignItems = 'CENTER';
    for (let index = 0; index < items.length; index += 1) {
      const item = autoFrame(`Nav item / ${items[index]}`, 'VERTICAL', { padding: 4, gap: 8, radius: 0, fill: color.white });
      item.appendChild(textNode(items[index], { size: 14, lineHeight: 20, style: 'Semi Bold', color: index === active ? color.tealDark : color.ink }));
      if (index === active) { const line = figma.createRectangle(); line.name = 'Active indicator'; line.resize(72, 3); line.fills = [solid(color.teal)]; item.appendChild(line); }
      nav.appendChild(item);
    }
    return nav;
  }

  function visualTable(columns, rows, width = 760) {
    const table = autoFrame('Data table specimen', 'VERTICAL', { width, padding: 0, gap: 1, radius: 8, fill: color.line, stroke: color.line });
    const allRows = [columns, ...rows];
    for (let rowIndex = 0; rowIndex < allRows.length; rowIndex += 1) {
      const row = autoFrame(`Table row ${rowIndex + 1}`, 'HORIZONTAL', { width, padding: 12, gap: 12, radius: 0, fill: rowIndex === 0 ? color.navy : color.white });
      for (const cell of allRows[rowIndex]) row.appendChild(textNode(cell, { size: 12, lineHeight: 18, style: rowIndex === 0 ? 'Bold' : 'Regular', color: rowIndex === 0 ? color.white : color.ink, width: Math.floor((width - 48) / columns.length) }));
      appendFill(table, row);
    }
    return table;
  }

  function renderComponentSpecimen(component, definition) {
    const widths = { shell: 900, action: 420, form: 560, navigation: 760, content: 680, card: 420, data: 840, media: 840, conversion: 900, ai: 760 };
    const width = widths[definition.specimenKind] || 560;
    applyAutoLayoutSizing(component, 'VERTICAL', width);
    component.paddingTop = 20; component.paddingRight = 20; component.paddingBottom = 20; component.paddingLeft = 20; component.itemSpacing = 12;
    component.cornerRadius = 10; component.fills = [solid(color.white)]; component.strokes = [solid(color.line)]; component.strokeWeight = 1;

    const add = node => { component.appendChild(node); node.layoutAlign = 'INHERIT'; return node; };
    const row = (name, children, rowWidth = width - 40, fill = color.white) => {
      const frame = autoFrame(name, 'HORIZONTAL', { width: rowWidth, padding: 12, gap: 16, radius: 6, fill, stroke: color.line }); frame.counterAxisAlignItems = 'CENTER';
      for (const child of children) frame.appendChild(child); return frame;
    };

    if (definition.id === 'G-001') {
      add(row('Global header', [textNode('MOXA', { size: 24, lineHeight: 28, style: 'Extra Bold', color: color.teal }), visualField('', 'Search products, solutions, and resources', 430), visualButton('Ask AI', 'ai'), visualButton('Contact Us')], width - 40));
    } else if (definition.id === 'G-002') {
      add(row('Brand lockup', [textNode('▲ MOXA®', { size: 40, lineHeight: 46, style: 'Extra Bold', color: color.teal })], 360));
    } else if (definition.id === 'G-003' || definition.id === 'F-004') {
      add(visualField('', 'Search products, solutions, and resources', Math.min(680, width - 40), 'focus'));
    } else if (definition.id === 'G-004') {
      add(visualButton('AI  Ask AI', 'ai'));
    } else if (definition.id === 'G-005') {
      add(row('Utility links', ['Contact Us', 'Partner Zone', 'My Moxa', 'Sign In'].map(item => textNode(item, { size: 13, lineHeight: 18, style: 'Semi Bold', color: color.ink })), 560));
    } else if (definition.id === 'G-006') {
      add(visualNav(['Products', 'Solutions', 'Resources', 'Support', 'Why Moxa'], 0, width - 40));
    } else if (definition.id === 'G-007') {
      const menu = autoFrame('Mega menu', 'HORIZONTAL', { width: width - 40, padding: 24, gap: 32, radius: 8, fill: color.white, stroke: color.line });
      for (const [heading, links] of [['Industrial networking', ['Ethernet Switches', 'Secure Routers']], ['Models & validation', ['EDS-4008-LV', 'Compare LV/HV']], ['Product media', ['Manuals', '360° Image']]]) {
        const column = autoFrame(`Menu column / ${heading}`, 'VERTICAL', { width: 240, padding: 0, gap: 10, radius: 0, fill: color.white }); appendFill(column, textNode(heading, { size: 12, lineHeight: 18, style: 'Bold', color: color.tealDark, textCase: 'UPPER' }));
        for (const link of links) appendFill(column, textNode(link, { size: 15, lineHeight: 22, style: 'Semi Bold', color: color.ink })); menu.appendChild(column);
      }
      add(menu);
    } else if (definition.id === 'G-008') {
      add(visualButton('Contact Us'));
    } else if (definition.id === 'G-009') {
      add(row('Breadcrumb', ['Home', '›', 'Products', '›', 'EDS-4008 Series'].map((item, index) => textNode(item, { size: 13, lineHeight: 18, style: index === 4 ? 'Semi Bold' : 'Regular', color: index === 4 ? color.ink : color.tealDark })), 620, color.tealSoft));
    } else if (definition.id === 'G-010') {
      const footer = autoFrame('Global footer', 'VERTICAL', { width: width - 40, padding: 28, gap: 20, radius: 8, fill: color.navy });
      const top = autoFrame('Footer action row', 'HORIZONTAL', { width: width - 96, padding: 0, gap: 32, radius: 0, fill: color.navy }); top.appendChild(textNode('FOLLOW MOXA   ●  ●  ●  ●', { size: 14, lineHeight: 20, style: 'Bold', color: color.white })); top.appendChild(textNode('STAY CONNECTED   Business email address   Sign Up', { size: 14, lineHeight: 20, style: 'Semi Bold', color: color.white })); footer.appendChild(top);
      footer.appendChild(textNode('Privacy  ·  Cookie preferences  ·  Terms  ·  Global / English', { size: 12, lineHeight: 18, color: color.tealSoft })); add(footer);
    } else if (definition.id === 'G-011') {
      add(row('Social links', ['f', '𝕏', '▶', 'in'].map(item => { const icon = autoFrame(`Social / ${item}`, 'HORIZONTAL', { padding: 12, gap: 0, radius: 4, fill: color.white, stroke: color.teal }); icon.appendChild(textNode(item, { size: 16, lineHeight: 18, style: 'Bold', color: color.tealDark })); return icon; }), 300));
    } else if (definition.id === 'G-012') {
      add(row('Subscription form', [visualField('', 'Business email address', 430), visualButton('Sign Up')], 620, color.tealSoft));
    } else if (definition.id === 'G-013') {
      add(visualField('Country / language', 'Global / English           ⌄', 360, 'filled'));
    } else if (definition.id === 'G-014') {
      const bot = autoFrame('Moxa bot', 'VERTICAL', { padding: 16, gap: 6, radius: 999, fill: color.white, stroke: color.cyan }); bot.appendChild(textNode('◉', { size: 34, lineHeight: 36, style: 'Bold', color: color.teal })); bot.appendChild(textNode('Ask', { size: 11, lineHeight: 14, style: 'Bold', color: color.tealDark })); add(bot);
    } else if (definition.id === 'G-015') {
      const panel = autoFrame('Moxa Solution Advisor', 'VERTICAL', { width: 480, padding: 20, gap: 14, radius: 10, fill: color.white, stroke: color.line }); appendFill(panel, textNode('Moxa Solution Advisor', { size: 18, lineHeight: 24, style: 'Bold', color: color.navy })); appendFill(panel, textNode('What would you like to validate?', { size: 14, lineHeight: 21, color: color.muted })); appendFill(panel, row('Advisor options', [chip('Search'), chip('Product finder'), chip('Compare LV/HV')], 440, color.tealSoft)); add(panel);
    } else if (definition.id === 'F-002') {
      add(textNode('Explore EDS-4008 Series  →', { size: 16, lineHeight: 22, style: 'Bold', color: color.tealDark }));
    } else if (definition.id === 'F-006') {
      const field = visualField('Project details', 'Describe your application, environment, and technical requirements…', width - 40); field.resize(field.width, 132); add(field);
    } else if (definition.id === 'F-008') {
      add(row('Field feedback', [textNode('✓', { size: 18, lineHeight: 20, style: 'Bold', color: color.teal }), textNode('Your request is ready to submit.', { size: 14, lineHeight: 20, color: color.ink })], 420, color.tealSoft));
    } else if (definition.id === 'N-001') {
      add(visualNav(['Overview', 'Popular configurations', 'All models', 'Resources', 'Applications'], 0, width - 40));
    } else if (definition.id === 'N-002') {
      const rail = autoFrame('Floating navigator', 'VERTICAL', { width: 84, padding: 14, gap: 16, radius: 40, fill: color.white, stroke: color.line }); for (const item of ['Ask', 'Products', 'Solutions', 'Proof']) rail.appendChild(textNode(`●  ${item}`, { size: 12, lineHeight: 18, style: item === 'Products' ? 'Bold' : 'Regular', color: item === 'Products' ? color.tealDark : color.muted })); add(rail);
    } else if (definition.id === 'N-005') {
      const modal = autoFrame('Contact modal', 'VERTICAL', { width: 520, padding: 24, gap: 14, radius: 10, fill: color.white, stroke: color.line }); appendFill(modal, textNode('Talk to a Moxa specialist                 ×', { size: 20, lineHeight: 26, style: 'Bold', color: color.navy })); appendFill(modal, visualField('Business email', 'name@company.com', 472)); modal.appendChild(visualButton('Send request')); add(modal);
    } else if (definition.id === 'N-006') {
      add(visualButton('↑  Back to top', 'secondary'));
    } else if (definition.id === 'C-001') {
      add(textNode('FEATURED PRODUCTS', { size: 12, lineHeight: 16, style: 'Bold', color: color.tealDark, letterSpacing: 2.2, textCase: 'UPPER' })); add(textNode('Engineered for reliable industrial networks.', { size: 32, lineHeight: 38, style: 'Bold', color: color.navy, width: width - 40 })); add(textNode('Explore proven connectivity products, application guidance, and technical evidence.', { size: 16, lineHeight: 25, color: color.muted, width: width - 40 }));
    } else if (definition.id === 'C-004' || definition.id === 'C-005' || definition.id === 'C-006' || definition.id === 'C-007') {
      add(visualArtwork(definition.name, width - 40, 180)); add(chip(definition.scope || definition.family)); add(textNode(definition.id === 'C-004' ? 'EDS-4008 Series' : definition.name, { size: 22, lineHeight: 28, style: 'Bold', color: color.navy, width: width - 40 })); add(textNode('Reliable connectivity for demanding industrial environments.', { size: 14, lineHeight: 21, color: color.muted, width: width - 40 })); add(textNode('Explore →', { size: 14, lineHeight: 20, style: 'Bold', color: color.tealDark }));
    } else if (definition.id === 'C-008') {
      add(textNode('1,000+', { size: 48, lineHeight: 54, style: 'Light', color: color.tealDark })); add(textNode('DISTRIBUTORS', { size: 12, lineHeight: 16, style: 'Bold', color: color.muted, letterSpacing: 1.8 }));
    } else if (definition.id === 'C-009') {
      add(row('Service card', [textNode('◉', { size: 30, lineHeight: 34, color: color.teal }), textNode('Product selection support\nTalk to an engineer about fit and availability.', { size: 16, lineHeight: 24, style: 'Semi Bold', color: color.navy, width: 310 })], width - 40, color.tealSoft));
    } else if (definition.id === 'D-001') {
      add(visualTable(['Specification', 'Value'], [['Ports', '8 × 10/100BaseT(X)'], ['Operating voltage', '9.6–60 VDC'], ['Temperature', '−40 to 75°C']], width - 40));
    } else if (definition.id === 'D-002') {
      add(visualTable(['Engineering specification', 'EDS-4008-LV', 'EDS-4008-HV'], [['Operating voltage', '9.6–60 VDC', '88–300 VDC'], ['AC input', '—', '85–264 VAC'], ['Power module', 'PWR-100-LV', 'PWR-105-HV-I']], width - 40));
    } else if (definition.id === 'D-003') {
      add(row('Search summary', [textNode('Results for “EDS-4008”', { size: 24, lineHeight: 30, style: 'Bold', color: color.navy }), chip('9 results')], width - 40, color.tealSoft));
    } else if (definition.id === 'D-004') {
      const filters = autoFrame('Refine results', 'VERTICAL', { width: 300, padding: 20, gap: 12, radius: 8, fill: color.white, stroke: color.line }); appendFill(filters, textNode('REFINE RESULTS', { size: 12, lineHeight: 16, style: 'Bold', color: color.tealDark, letterSpacing: 1.8 })); for (const item of ['☑ Products      4', '☑ Documents   3', '☑ Videos          1', '☐ Support        0']) appendFill(filters, textNode(item, { size: 14, lineHeight: 21, style: 'Semi Bold', color: color.ink })); add(filters);
    } else if (definition.id === 'D-005' || definition.id === 'D-006' || definition.id === 'D-007') {
      const result = row(definition.name, [visualArtwork('EDS-4008', 180, 110), textNode(`${definition.id === 'D-007' ? 'EDS-4008-HV' : 'EDS-4008 Series'}\nManaged Ethernet switches for industrial applications.\nIn stock · DIN rail · Managed`, { size: 15, lineHeight: 23, style: 'Semi Bold', color: color.navy, width: 400 }), visualButton(definition.id === 'D-006' ? 'Browse family' : 'View model', 'secondary')], width - 40, color.white); add(result);
    } else if (definition.id === 'M-001') {
      const hero = autoFrame('Hero specimen', 'HORIZONTAL', { width: width - 40, padding: 28, gap: 28, radius: 10, fill: color.tealSoft }); const copy = autoFrame('Hero copy', 'VERTICAL', { width: 360, padding: 0, gap: 12, radius: 0, fill: color.tealSoft }); appendFill(copy, textNode('Build resilient industrial networks.', { size: 34, lineHeight: 40, style: 'Bold', color: color.navy, width: 360 })); appendFill(copy, textNode('Secure, reliable infrastructure for demanding environments.', { size: 16, lineHeight: 24, color: color.muted, width: 340 })); copy.appendChild(visualButton('Explore solutions')); hero.appendChild(copy); hero.appendChild(visualArtwork('Industrial connectivity', 360, 230)); add(hero);
    } else if (definition.id === 'M-002') {
      const player = visualArtwork('▶  Making Digital the New Current', width - 40, 360); add(player); add(row('Video controls', [textNode('▶   00:00', { size: 14, lineHeight: 20, style: 'Bold', color: color.ink }), textNode('━━━━━━━━━━━━━━━━━━   06:42   ⚙   ⛶', { size: 14, lineHeight: 20, color: color.muted })], width - 40));
    } else if (definition.id === 'M-003') {
      add(row('Playlist item', [visualArtwork('Episode 2', 180, 100), textNode('Connect the Energy Ecosystem\nEpisode 2 · 05:28', { size: 17, lineHeight: 24, style: 'Bold', color: color.navy, width: 360 })], 620, color.tealSoft));
    } else if (definition.id === 'M-004') {
      add(visualArtwork('360° EDS-4008 product viewer', width - 40, 330)); add(row('360 viewer controls', [visualButton('↶'), textNode('Drag to rotate   ·   Zoom 100%', { size: 14, lineHeight: 20, color: color.muted }), visualButton('↷')], 520));
    } else if (definition.id === 'V-001') {
      const cta = autoFrame('CTA band', 'HORIZONTAL', { width: width - 40, padding: 28, gap: 28, radius: 10, fill: color.navy }); cta.appendChild(textNode('Ready to build a more resilient network?', { size: 28, lineHeight: 34, style: 'Bold', color: color.white, width: 520 })); cta.appendChild(visualButton('Talk to an expert')); add(cta);
    } else if (definition.id === 'V-002') {
      const lead = autoFrame('Lead capture', 'HORIZONTAL', { width: width - 40, padding: 24, gap: 24, radius: 10, fill: color.tealSoft }); const info = autoFrame('Contact guidance', 'VERTICAL', { width: 300, padding: 20, gap: 10, radius: 8, fill: color.navy }); appendFill(info, textNode('Talk to a Moxa specialist', { size: 22, lineHeight: 28, style: 'Bold', color: color.white, width: 260 })); appendFill(info, textNode('Share your application and technical requirements.', { size: 14, lineHeight: 21, color: color.tealSoft, width: 260 })); lead.appendChild(info); const form = autoFrame('Lead form fields', 'VERTICAL', { width: 480, padding: 0, gap: 10, radius: 0, fill: color.tealSoft }); appendFill(form, visualField('First name', 'Alex', 480, 'filled')); appendFill(form, visualField('Business email', 'alex@company.com', 480, 'filled')); form.appendChild(visualButton('Submit request')); lead.appendChild(form); add(lead);
    } else if (definition.id === 'AI-001') {
      add(row('AI message', [textNode('◉', { size: 30, lineHeight: 34, style: 'Bold', color: color.teal }), textNode('The key difference is the power-input range. Choose LV for low-voltage DC environments and HV for high-voltage DC or AC input.', { size: 15, lineHeight: 23, color: color.ink, width: 560 })], width - 40, color.tealSoft));
    } else if (definition.id === 'AI-002') {
      add(row('Sources', [textNode('Sources:', { size: 14, lineHeight: 20, style: 'Bold', color: color.navy }), textNode('EDS-4008-LV Datasheet ↗', { size: 14, lineHeight: 20, style: 'Semi Bold', color: color.tealDark }), textNode('EDS-4008-HV Datasheet ↗', { size: 14, lineHeight: 20, style: 'Semi Bold', color: color.tealDark })], width - 40));
    } else if (definition.id === 'AI-003') {
      add(row('Follow-up prompts', [chip('Compare power inputs'), chip('Show shared specifications'), chip('Open model pages')], width - 40, color.tealSoft));
    } else {
      add(row('Visual specimen', [textNode(definition.name, { size: 18, lineHeight: 24, style: 'Bold', color: color.navy }), chip(definition.states[0] || 'default')], Math.min(width - 40, 620), color.tealSoft));
    }
  }

  function componentDocumentationCard(definition, component) {
    const width = Math.min(1312, Math.max(component.width + 48, 560));
    const card = autoFrame(`Visual specimen / ${definition.id}`, 'VERTICAL', { width, padding: 24, gap: 16, radius: 12, fill: color.white, stroke: color.line });
    tag(card, 'phase3', `visual-specimen/${definition.id}`);
    appendFill(card, textNode(`${definition.id} · ${definition.name}`, { size: 22, lineHeight: 28, style: 'Bold', color: color.navy }));
    appendFill(card, textNode(`${definition.family} · ${definition.scope} · Sitecore: ${definition.sitecoreRendering}`, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.tealDark }));
    card.appendChild(component); component.layoutAlign = 'INHERIT';
    const meta = autoFrame('Component notes', 'HORIZONTAL', { padding: 0, gap: 8, radius: 0, fill: color.white }); meta.layoutWrap = 'WRAP';
    for (const state of definition.states.slice(0, 6)) meta.appendChild(chip(state)); card.appendChild(meta);
    appendFill(card, textNode(definition.responsive, { size: 12, lineHeight: 18, color: color.muted, width: width - 48 }));
    return card;
  }

  function addFoundationDocumentation(pages) {
    const cover = pageCanvas(pages[PAGE_NAMES[0]], 'A governed operating system for the Moxa PoC, component decomposition, and Sitecore implementation.');
    cover.paddingTop = 112;
    appendFill(cover, textNode('Reliable networks.\nSincere service.', { size: 72, lineHeight: 74, style: 'Extra Bold', color: color.navy, width: 1040 }));
    appendFill(cover, textNode('Moxa PoC Operational Design System v1.0', { size: 22, lineHeight: 30, style: 'Semi Bold', color: color.teal }));
    addMetricRow(cover, [{ value: '64', label: 'Logical tokens' }, { value: '54', label: 'Components' }, { value: '12', label: 'Page types' }, { value: '13', label: 'Routes' }]);

    const getting = pageCanvas(pages[PAGE_NAMES[1]], 'How designers, front-end developers, and Sitecore authors use the same system.');
    for (const [index, item] of ['Start with a token or existing component', 'Compose a governed pattern', 'Configure a page template', 'Map content to Sitecore datasource fields', 'Validate accessibility and analytics'].entries()) {
      const row = autoFrame(`Getting started / ${index + 1}`, 'HORIZONTAL', { padding: 20, gap: 16, radius: 8, fill: color.white, stroke: color.line });
      row.appendChild(chip(String(index + 1), color.teal, color.white));
      row.appendChild(textNode(item, { size: 18, lineHeight: 26, style: 'Semi Bold' }));
      appendFill(getting, row);
    }

    const principles = pageCanvas(pages[PAGE_NAMES[2]], 'Brand promise translated into repeatable interface decisions.');
    const principlesList = [['Reliable industrial clarity', 'Disciplined alignment, technical evidence, and predictable interaction.'], ['Product evidence before promotion', 'Specifications, sources, and application proof precede decoration.'], ['Guided decision making', 'Search, selectors, comparison, and Advisor reduce selection effort.'], ['One shared system', 'Page differences come from configuration and datasource content.'], ['Accessible by default', 'Keyboard, focus, contrast, labels, and reduced motion are acceptance criteria.']];
    for (const item of principlesList) {
      const card = autoFrame(`Principle / ${item[0]}`, 'VERTICAL', { padding: 24, gap: 8, radius: 8, fill: color.white, stroke: color.line });
      appendFill(card, textNode(item[0], { size: 22, lineHeight: 28, style: 'Bold', color: color.navy }));
      appendFill(card, textNode(item[1], { size: 16, lineHeight: 24, color: color.muted }));
      appendFill(principles, card);
    }

    const colorPage = pageCanvas(pages[PAGE_NAMES[3]], 'Implementation colors and semantic use. Semantic themes are separate collections because Backup uses a Starter plan.');
    const swatches = autoFrame('Color swatches', 'HORIZONTAL', { padding: 0, gap: 16, radius: 0, fill: color.surface });
    swatches.layoutWrap = 'WRAP';
    appendFill(colorPage, swatches);
    const colors = [['Moxa Teal', '#008787'], ['Teal 700', '#006B6B'], ['Teal 100', '#E7F5F4'], ['Moxa Navy', '#082F49'], ['Cyan', '#40CBD0'], ['Orange', '#F39A61'], ['Ink', '#162F3A'], ['Muted', '#637781'], ['Line', '#D7E3E4'], ['Surface', '#F4F8F8']];
    for (const [name, hex] of colors) {
      const card = autoFrame(`Swatch / ${name}`, 'VERTICAL', { width: 240, padding: 16, gap: 12, radius: 8, fill: color.white, stroke: color.line });
      const swatch = figma.createRectangle(); swatch.resize(208, 96); swatch.cornerRadius = 4; swatch.fills = [solid(hexToRgb(hex))]; card.appendChild(swatch);
      card.appendChild(textNode(name, { size: 14, lineHeight: 20, style: 'Bold' }));
      card.appendChild(textNode(hex, { size: 12, lineHeight: 18, style: 'Medium', color: color.muted }));
      swatches.appendChild(card);
    }

    const typePage = pageCanvas(pages[PAGE_NAMES[4]], 'Helvetica Neue / Helvetica / Arial in implementation; Inter is the editable Figma fallback.');
    for (const definition of TEXT_STYLES) {
      const row = autoFrame(`Type specimen / ${definition.name}`, 'HORIZONTAL', { padding: 20, gap: 24, radius: 8, fill: color.white, stroke: color.line });
      const label = textNode(definition.name, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.tealDark, width: 220 }); row.appendChild(label);
      const specimen = textNode('Reliable industrial connectivity', { size: definition.size, lineHeight: definition.lineHeight, style: definition.style, color: color.ink, width: 900 }); row.appendChild(specimen);
      appendFill(typePage, row);
    }

    const spacingPage = pageCanvas(pages[PAGE_NAMES[5]], 'A 4px half-step and 8px-led spacing system inside a 1240px content container.');
    for (const value of [4, 8, 12, 16, 24, 32, 48, 64]) {
      const row = autoFrame(`Spacing / ${value}`, 'HORIZONTAL', { padding: 12, gap: 16, radius: 4, fill: color.white });
      row.appendChild(textNode(`${value}px`, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.muted, width: 72 }));
      const bar = figma.createRectangle(); bar.resize(value * 5, 16); bar.cornerRadius = 2; bar.fills = [solid(color.cyan)]; row.appendChild(bar);
      appendFill(spacingPage, row);
    }

    const radiusPage = pageCanvas(pages[PAGE_NAMES[6]], 'Implemented radius, elevation, and motion rules. Corners communicate hierarchy rather than decoration.');
    addMetricRow(radiusPage, [{ value: '4px', label: 'Small radius' }, { value: '8px', label: 'Medium radius' }, { value: '12px', label: 'Large radius' }, { value: '180ms', label: 'Default motion' }]);

    const imageryPage = pageCanvas(pages[PAGE_NAMES[7]], 'Use client-provided industrial imagery, clear product crops, and familiar functional icons.');
    for (const item of ['Product evidence: preserve ports, labels, and device proportions', 'Application imagery: show real industrial context', 'Icons: one visual family, descriptive accessible labels', 'Avoid generic decorative imagery when product evidence exists']) appendFill(imageryPage, textNode(`• ${item}`, { size: 18, lineHeight: 28, color: color.ink }));
  }

  function genericComponent(definition) {
    const component = figma.createComponent();
    component.name = `${definition.id} / ${definition.name}`;
    renderComponentSpecimen(component, definition);
    tag(component, 'phase3', `component/${definition.id}`);
    component.setSharedPluginData(NS, 'component_id', definition.id);
    component.description = `${definition.family}. Sitecore: ${definition.sitecoreRendering}. Selector: ${definition.selector}. Accessibility: ${definition.accessibility}`;
    return component;
  }

  function buttonVariantSet(definition) {
    const styles = ['Primary', 'Secondary', 'Hero', 'Text'];
    const states = ['Default', 'Hover'];
    const variants = [];
    for (const styleName of styles) for (const state of states) {
      const component = figma.createComponent();
      component.name = `Style=${styleName}, State=${state}`;
      applyAutoLayoutSizing(component, 'HORIZONTAL');
      component.paddingTop = 14; component.paddingBottom = 14; component.paddingLeft = 20; component.paddingRight = 20; component.itemSpacing = 8; component.cornerRadius = 4;
      const isText = styleName === 'Text'; const isSecondary = styleName === 'Secondary';
      const fill = styleName === 'Hero' ? color.orange : (isSecondary || isText ? color.white : (state === 'Hover' ? color.tealDark : color.teal));
      component.fills = [solid(fill)];
      component.strokes = isSecondary ? [solid(color.teal)] : [];
      component.strokeWeight = isSecondary ? 1 : 0;
      component.appendChild(textNode(styleName === 'Text' ? 'Text link →' : 'Primary action', { size: 14, lineHeight: 20, style: 'Bold', color: isText || isSecondary || styleName === 'Hero' ? color.tealDark : color.white }));
      variants.push(component);
    }
    const set = figma.combineAsVariants(variants, figma.currentPage);
    set.name = `${definition.id} / ${definition.name}`;
    set.description = `Moxa action system. Sitecore: ${definition.sitecoreRendering}.`;
    applyAutoLayoutSizing(set, 'HORIZONTAL', 740);
    set.layoutWrap = 'WRAP'; set.counterAxisSpacing = 12; set.itemSpacing = 12;
    set.paddingTop = 16; set.paddingRight = 16; set.paddingBottom = 16; set.paddingLeft = 16;
    for (const variant of set.children) variant.layoutAlign = 'INHERIT';
    tag(set, 'phase3', `component/${definition.id}`); set.setSharedPluginData(NS, 'component_id', definition.id);
    return set;
  }

  function renderVariantContent(component, definition, value) {
    const isFocus = value === 'Focus';
    const isError = value === 'Error';
    const isSelected = value === 'Selected' || value === 'Checked';
    if (definition.id === 'F-003') {
      const state = isError ? 'error' : (isFocus ? 'focus' : (value === 'Filled' ? 'filled' : 'default'));
      appendFill(component, visualField('Business email', value === 'Filled' ? 'alex@company.com' : 'name@company.com', 380, state));
    } else if (definition.id === 'F-005') {
      appendFill(component, visualField('Industry', isSelected ? 'Manufacturing' : 'Select an industry                         ⌄', 380, isError ? 'error' : (isFocus ? 'focus' : (isSelected ? 'filled' : 'default'))));
    } else if (definition.id === 'F-007') {
      const row = autoFrame('Consent option', 'HORIZONTAL', { width: 380, padding: 10, gap: 12, radius: 6, fill: color.white, stroke: isError ? color.orange : (isFocus ? color.cyan : color.line) });
      row.counterAxisAlignItems = 'CENTER';
      const box = autoFrame('Checkbox', 'HORIZONTAL', { width: 24, padding: 3, gap: 0, radius: 4, fill: isSelected ? color.teal : color.white, stroke: isSelected ? color.teal : color.line });
      box.primaryAxisAlignItems = 'CENTER'; box.counterAxisAlignItems = 'CENTER';
      if (isSelected) box.appendChild(textNode('✓', { size: 14, lineHeight: 16, style: 'Bold', color: color.white }));
      row.appendChild(box);
      row.appendChild(textNode('I agree to the privacy notice and consent to follow-up.', { size: 13, lineHeight: 20, color: color.ink, width: 320 }));
      appendFill(component, row);
      if (isError) appendFill(component, textNode('Consent is required to continue.', { size: 12, lineHeight: 18, color: color.orange }));
    } else if (definition.id === 'N-003') {
      addVariantNode(component, visualNav(['Overview', 'Specifications', 'Downloads'], isSelected ? 1 : 0, 380));
    } else if (definition.id === 'N-004') {
      const accordion = autoFrame('Accordion item', 'VERTICAL', { width: 380, padding: 16, gap: 12, radius: 6, fill: value === 'Open' ? color.tealSoft : color.white, stroke: color.line });
      const heading = autoFrame('Accordion trigger', 'HORIZONTAL', { width: 348, padding: 0, gap: 12, radius: 0, fill: value === 'Open' ? color.tealSoft : color.white });
      heading.primaryAxisAlignItems = 'SPACE_BETWEEN'; heading.counterAxisAlignItems = 'CENTER';
      heading.appendChild(textNode('How Moxa delivers secure devices', { size: 14, lineHeight: 20, style: 'Bold', color: color.navy, width: 290 }));
      heading.appendChild(textNode(value === 'Open' ? '−' : '+', { size: 24, lineHeight: 24, style: 'Bold', color: color.tealDark }));
      appendFill(accordion, heading);
      if (value === 'Open') appendFill(accordion, textNode('Security is built into the product lifecycle through secure development, signed firmware, and hardened configuration.', { size: 13, lineHeight: 20, color: color.muted, width: 348 }));
      appendFill(component, accordion);
    } else if (definition.id === 'C-002') {
      const tones = { Neutral: [color.surface, color.ink], Brand: [color.tealSoft, color.tealDark], Success: [{ r: 232 / 255, g: 248 / 255, b: 235 / 255 }, { r: 30 / 255, g: 112 / 255, b: 58 / 255 }], Warning: [{ r: 1, g: 243 / 255, b: 224 / 255 }, { r: 158 / 255, g: 78 / 255, b: 0 }] };
      const [fill, ink] = tones[value] || tones.Neutral;
      addVariantNode(component, chip(value === 'Success' ? 'IN STOCK' : (value === 'Warning' ? 'EOL' : (value === 'Brand' ? 'NEW' : 'LEGACY')), fill, ink));
    } else if (definition.id === 'C-003') {
      const tones = { Info: [color.tealSoft, color.tealDark, 'ℹ'], Success: [{ r: 232 / 255, g: 248 / 255, b: 235 / 255 }, { r: 30 / 255, g: 112 / 255, b: 58 / 255 }, '✓'], Warning: [{ r: 1, g: 243 / 255, b: 224 / 255 }, { r: 158 / 255, g: 78 / 255, b: 0 }, '!'], Error: [{ r: 1, g: 235 / 255, b: 232 / 255 }, { r: 178 / 255, g: 45 / 255, b: 38 / 255 }, '×'] };
      const [fill, ink, icon] = tones[value] || tones.Info;
      const alert = autoFrame(`Alert / ${value}`, 'HORIZONTAL', { width: 380, padding: 14, gap: 12, radius: 6, fill });
      alert.counterAxisAlignItems = 'CENTER'; alert.appendChild(textNode(icon, { size: 18, lineHeight: 20, style: 'Bold', color: ink })); alert.appendChild(textNode(`${value} message with a clear next action.`, { size: 13, lineHeight: 20, style: 'Semi Bold', color: ink, width: 310 }));
      appendFill(component, alert);
    } else {
      appendFill(component, textNode(value, { size: 14, lineHeight: 20, style: 'Bold', color: color.tealDark }));
    }
  }

  function addVariantNode(component, node) {
    component.appendChild(node);
    node.layoutAlign = 'INHERIT';
    return node;
  }

  function simpleVariantSet(definition, property, values) {
    const variants = [];
    for (const value of values) {
      const component = figma.createComponent();
      component.name = `${property}=${value}`;
      applyAutoLayoutSizing(component, 'VERTICAL', 420);
      component.paddingTop = 20; component.paddingRight = 20; component.paddingBottom = 20; component.paddingLeft = 20; component.itemSpacing = 10; component.cornerRadius = 8;
      component.fills = [solid(value === 'Open' || value === 'Selected' ? color.tealSoft : color.white)]; component.strokes = [solid(value === 'Error' ? color.orange : color.line)]; component.strokeWeight = 1;
      appendFill(component, textNode(`${definition.name} · ${value}`, { size: 12, lineHeight: 18, style: 'Bold', color: color.tealDark }));
      renderVariantContent(component, definition, value);
      variants.push(component);
    }
    const set = figma.combineAsVariants(variants, figma.currentPage);
    set.name = `${definition.id} / ${definition.name}`;
    set.description = `${definition.family}. Sitecore: ${definition.sitecoreRendering}.`;
    applyAutoLayoutSizing(set, 'HORIZONTAL', 884);
    set.layoutWrap = 'WRAP'; set.counterAxisSpacing = 12; set.itemSpacing = 12;
    set.paddingTop = 16; set.paddingRight = 16; set.paddingBottom = 16; set.paddingLeft = 16;
    for (const variant of set.children) variant.layoutAlign = 'INHERIT';
    tag(set, 'phase3', `component/${definition.id}`); set.setSharedPluginData(NS, 'component_id', definition.id);
    return set;
  }

  async function ensureComponents(pages) {
    const output = {};
    const special = {
      'F-001': ['button'],
      'F-003': ['State', ['Default', 'Focus', 'Filled', 'Error']],
      'F-005': ['State', ['Default', 'Focus', 'Selected', 'Error']],
      'F-007': ['State', ['Unchecked', 'Checked', 'Focus', 'Error']],
      'N-003': ['State', ['Default', 'Selected']],
      'N-004': ['State', ['Closed', 'Open']],
      'C-002': ['Tone', ['Neutral', 'Brand', 'Success', 'Warning']],
      'C-003': ['Tone', ['Info', 'Success', 'Warning', 'Error']]
    };
    for (const definition of COMPONENT_DEFINITIONS) {
      const page = pages[definition.page];
      if (!page) throw new Error(`Missing component page: ${definition.page}`);
      await figma.setCurrentPageAsync(page);
      const existing = page.findOne(node => (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') && node.getSharedPluginData(NS, 'component_id') === definition.id);
      const existingDocumentation = page.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `visual-specimen/${definition.id}`);
      if (existingDocumentation) existingDocumentation.remove();
      else if (existing) existing.remove();
      const canvas = pageCanvas(page, 'Native Moxa components with anatomy, states, accessibility, responsive rules, and Sitecore mapping.');
      const gallery = componentGallery(canvas);
      let node;
      if (special[definition.id]?.[0] === 'button') node = buttonVariantSet(definition);
      else if (special[definition.id]) node = simpleVariantSet(definition, special[definition.id][0], special[definition.id][1]);
      else node = genericComponent(definition);
      const documentation = componentDocumentationCard(definition, node);
      gallery.appendChild(documentation); documentation.layoutAlign = 'INHERIT'; output[definition.id] = node.id;
    }
    return output;
  }

  function templateFrame(name, description, width = 400) {
    const frame = autoFrame(`Template / ${name}`, 'VERTICAL', { width, padding: 0, gap: 0, radius: 12, fill: color.white, stroke: color.line });
    frame.clipsContent = true;
    const header = autoFrame('Global Header', 'HORIZONTAL', { padding: 14, gap: 16, radius: 0, fill: color.white });
    header.appendChild(textNode('MOXA', { size: 18, lineHeight: 22, style: 'Extra Bold', color: color.teal }));
    header.appendChild(textNode('Search + Ask AI', { size: 11, lineHeight: 16, color: color.muted }));
    appendFill(frame, header);
    const nav = autoFrame('Primary Navigation', 'HORIZONTAL', { padding: 12, gap: 18, radius: 0, fill: color.white });
    for (const item of ['Products', 'Solutions', 'Resources']) nav.appendChild(textNode(item, { size: 10, lineHeight: 14, style: 'Semi Bold', color: color.ink }));
    appendFill(frame, nav);
    const hero = autoFrame('Hero', 'VERTICAL', { padding: 24, gap: 10, radius: 0, fill: color.tealSoft });
    appendFill(hero, textNode(name, { size: 26, lineHeight: 30, style: 'Bold', color: color.navy, width: width - 48 }));
    appendFill(hero, textNode(description, { size: 12, lineHeight: 18, color: color.muted, width: width - 48 }));
    hero.appendChild(chip('Primary action', color.teal, color.white));
    appendFill(frame, hero);
    const body = autoFrame('Configurable body', 'VERTICAL', { padding: 20, gap: 10, radius: 0, fill: color.white });
    for (const label of ['Section header', 'Evidence collection', 'Decision support', 'Contextual CTA']) {
      const block = autoFrame(label, 'VERTICAL', { padding: 12, gap: 4, radius: 6, fill: color.surface, stroke: color.line });
      appendFill(block, textNode(label, { size: 12, lineHeight: 18, style: 'Semi Bold', color: color.navy }));
      appendFill(body, block);
    }
    appendFill(frame, body);
    const footer = autoFrame('Global Footer', 'HORIZONTAL', { padding: 16, gap: 18, radius: 0, fill: color.navy });
    footer.appendChild(textNode('Follow Moxa', { size: 10, lineHeight: 14, style: 'Bold', color: color.white }));
    footer.appendChild(textNode('Stay Connected', { size: 10, lineHeight: 14, style: 'Bold', color: color.white }));
    appendFill(frame, footer);
    return frame;
  }

  async function ensurePatternsAndTemplates(pages) {
    const patternPages = PAGE_NAMES.slice(21, 26);
    const patternExamples = {
      '22 — Shared Shell Patterns': ['Global Header', 'Breadcrumb + Anchor Nav', 'Lead Capture + Footer'],
      '23 — Product Discovery Patterns': ['Homepage', 'Search Results', 'Product Category'],
      '24 — Product Detail Patterns': ['Product Series', 'Product Model', 'NPort 5100'],
      '25 — Campaign & Microsite Patterns': ['Campaign', 'Microsite', 'Campaign Pop-up'],
      '26 — Support, Manual & Media Patterns': ['HXML Manual', 'Video Collection', 'AI Comparison', 'Product Media']
    };
    for (const name of patternPages) {
      const page = pages[name]; await figma.setCurrentPageAsync(page); const canvas = pageCanvas(page, 'Reusable compositions assembled from governed Moxa components.');
      if (!canvas.findOne(node => node.getSharedPluginData(NS, 'key') === `pattern/${name}`)) {
        const gallery = autoFrame('Pattern gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 20, radius: 0, fill: color.surface });
        gallery.layoutWrap = 'WRAP'; gallery.counterAxisSpacing = 20; tag(gallery, 'phase4', `pattern/${name}`);
        for (const example of patternExamples[name]) {
          const preview = templateFrame(example, 'A reusable composition with shared spacing, interaction, accessibility, analytics, and datasource responsibilities.', 400);
          gallery.appendChild(preview); preview.layoutAlign = 'INHERIT';
        }
        appendFill(canvas, gallery);
      }
    }

    const templatePage = pages['27 — Page Templates / 12 Types']; await figma.setCurrentPageAsync(templatePage); const templateCanvas = pageCanvas(templatePage, 'Twelve configurable page templates. Product Model covers both LV and HV routes; Campaign Pop-up is a governed composition.');
    const templates = ['Homepage', 'Search Results', 'Product Category', 'Product Series', 'Product Model', 'Campaign', 'Campaign Pop-up', 'Microsite', 'Video', 'HXML Manual', 'AI Comparison', 'Product Media'];
    const templateGallery = autoFrame('Template gallery', 'HORIZONTAL', { width: 1312, padding: 0, gap: 20, radius: 0, fill: color.surface });
    templateGallery.layoutWrap = 'WRAP'; templateGallery.counterAxisSpacing = 20; appendFill(templateCanvas, templateGallery);
    for (const name of templates) {
      const preview = templateFrame(name, 'Shared shell plus configurable evidence, guidance, and conversion modules.', 400);
      templateGallery.appendChild(preview); preview.layoutAlign = 'INHERIT';
    }

    const routePage = pages['28 — Route Coverage / 13 Routes']; await figma.setCurrentPageAsync(routePage); const routeCanvas = pageCanvas(routePage, 'Every PoC route mapped to a governed page template and shared shell.');
    if (!routeCanvas.findOne(node => node.getSharedPluginData(NS, 'key') === 'route/coverage')) {
      const table = autoFrame('Route coverage matrix', 'VERTICAL', { padding: 0, gap: 1, radius: 8, fill: color.line, stroke: color.line }); tag(table, 'phase4', 'route/coverage');
      for (const route of ROUTE_DEFINITIONS) { const row=autoFrame(`Route / ${route.id}`,'HORIZONTAL',{padding:16,gap:16,radius:0,fill:color.white}); row.appendChild(textNode(route.id,{size:12,lineHeight:18,style:'Bold',color:color.tealDark,width:64})); row.appendChild(textNode(route.type,{size:14,lineHeight:20,style:'Semi Bold',width:180})); row.appendChild(textNode(route.file,{size:13,lineHeight:20,color:color.muted,width:360})); row.appendChild(chip(route.status)); appendFill(table,row); }
      appendFill(routeCanvas, table);
    }

    const a11yPage = pages['29 — Accessibility & Content Guidance']; await figma.setCurrentPageAsync(a11yPage); const a11yCanvas = pageCanvas(a11yPage, 'Component acceptance rules for keyboard, focus, contrast, structure, motion, and evidence.');
    for (const item of ['44px minimum target for primary controls', '3px Cyan focus ring with 3px offset', 'Keyboard and Escape behavior for overlays and navigation', 'Captions and scoped headers for data tables', 'Explicit sources immediately below AI answers', 'Reduced motion preserves final values and state']) appendFill(a11yCanvas, textNode(`✓ ${item}`, { size: 18, lineHeight: 28, style: 'Semi Bold', color: color.navy }));

    const sitecorePage = pages['30 — Sitecore Mapping & Governance']; await figma.setCurrentPageAsync(sitecorePage); const sitecoreCanvas = pageCanvas(sitecorePage, 'Figma → HTML/CSS/JavaScript → Sitecore rendering → datasource mapping.');
    if (!sitecoreCanvas.findOne(node => node.getSharedPluginData(NS, 'key') === 'sitecore/crosswalk')) {
      const list = autoFrame('Sitecore crosswalk', 'VERTICAL', { padding: 0, gap: 12, radius: 0, fill: color.surface }); tag(list, 'phase4', 'sitecore/crosswalk');
      for (const mapping of SITECORE_MAPPINGS) { const card=autoFrame(`Mapping / ${mapping.id}`,'VERTICAL',{padding:20,gap:6,radius:8,fill:color.white,stroke:color.line});appendFill(card,textNode(`${mapping.id} · ${mapping.figmaPattern}`,{size:16,lineHeight:22,style:'Bold',color:color.navy}));appendFill(card,textNode(`${mapping.implementation} → ${mapping.rendering} → ${mapping.datasource}`,{size:13,lineHeight:20,color:color.muted}));appendFill(list,card); }
      appendFill(sitecoreCanvas, list);
    }

    const changePage = pages['31 — Changelog & Open Decisions']; await figma.setCurrentPageAsync(changePage); const changeCanvas = pageCanvas(changePage, 'Release status, constraints, and future production decisions.');
    appendFill(changeCanvas, textNode('v1.0 · 2026-07-20 · PoC operational baseline', { size: 24, lineHeight: 32, style: 'Bold', color: color.navy }));
    appendFill(changeCanvas, textNode('Backup Starter plan: theme and responsive modes use separate single-mode collections. Implementation services for search, CRM, and AI remain integration-ready, not production-connected.', { size: 16, lineHeight: 25, color: color.muted, width: 1080 }));
  }

  async function fitAllPages(pages) {
    for (const page of Object.values(pages)) {
      await figma.setCurrentPageAsync(page);
      const canvas = page.findOne(node => node.type === 'FRAME' && node.getSharedPluginData(NS, 'key') === `canvas/${page.name}`);
      if (canvas) figma.viewport.scrollAndZoomIntoView([canvas]);
    }
  }

  async function main() {
    await loadFonts();
    const collections = await ensureCollections();
    const styles = await ensureStyles();
    const pages = await ensurePages();
    await resetGeneratedCanvases(pages);
    for (const page of Object.values(pages)) { await figma.setCurrentPageAsync(page); pageCanvas(page, 'Moxa PoC Operational Design System v1.0'); }
    addFoundationDocumentation(pages);
    const components = await ensureComponents(pages);
    await ensurePatternsAndTemplates(pages);
    await fitAllPages(pages);
    figma.root.setSharedPluginData(NS, 'run_id', RUN_ID);
    figma.root.setSharedPluginData(NS, 'version', '1.0.0');
    figma.root.setSharedPluginData(NS, 'status', 'complete');
    try { await figma.saveVersionHistoryAsync('Moxa Operational Design System v1.0', 'Variables, styles, 54 components, 12 page templates, 13-route coverage, and Sitecore mapping.'); } catch (error) { /* Starter plans may not expose version history. */ }
    await figma.setCurrentPageAsync(pages[PAGE_NAMES[0]]);
    figma.viewport.scrollAndZoomIntoView(pages[PAGE_NAMES[0]].children);
    figma.closePlugin(`Moxa Design System created: ${Object.keys(collections).length} collections, ${Object.keys(components).length} components, ${PAGE_NAMES.length} pages.`);
  }

  main().catch(error => figma.closePlugin(`Moxa Builder failed: ${error.message}`));
})();
