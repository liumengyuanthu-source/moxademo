from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class RemoteIOContractTests(unittest.TestCase):
    def setUp(self):
        self.microsite = (ROOT / "microsite.html").read_text(encoding="utf-8")
        self.campaign = (ROOT / "campaign.html").read_text(encoding="utf-8")
        self.microsite_css = (
            ROOT / "assets/css/microsite-remote-io.css"
        ).read_text(encoding="utf-8")

    def test_microsite_contains_required_sections(self):
        required = (
            "remote-io-hero",
            "overview",
            "whymoxa",
            "portfolio",
            "applications",
            "comparison",
            "contact-us",
        )
        for section_id in required:
            self.assertRegex(
                self.microsite,
                rf'id=["\']{re.escape(section_id)}["\']',
            )

    def test_microsite_loads_focused_assets(self):
        self.assertIn("assets/css/microsite-remote-io.css", self.microsite)
        self.assertIn("assets/js/microsite-remote-io.js", self.microsite)
        self.assertIn("assets/js/moxa-lead-form.js", self.microsite)

    def test_remote_io_images_are_local(self):
        remote_sources = re.findall(
            r'<img[^>]+src=["\']([^"\']+)["\']',
            self.microsite,
        )
        self.assertTrue(remote_sources)
        for source in remote_sources:
            self.assertFalse(source.startswith("http"), source)
            if source.startswith("assets/microsite/"):
                self.assertTrue((ROOT / source).is_file(), source)

    def test_shared_lead_form_schema(self):
        field_names = (
            "first_name",
            "work_email",
            "company",
            "industry",
            "country",
            "project_details",
            "privacy",
        )
        for page in (self.microsite, self.campaign):
            self.assertIn("data-moxa-lead-form", page)
            self.assertIn("assets/js/moxa-lead-form.js", page)
            for name in field_names:
                self.assertRegex(page, rf'name=["\']{name}["\']')
            self.assertNotRegex(page, r'name=["\']last_name["\']')

    def test_shared_shell_is_preserved(self):
        self.assertIn('data-moxa-page="microsite"', self.microsite)
        self.assertIn("assets/js/moxa-shell.js", self.microsite)
        self.assertNotIn('<header class="header"', self.microsite)
        self.assertNotIn('<footer class="footer"', self.microsite)

    def test_internal_anchor_navigation_matches_campaign_tab_bar(self):
        self.assertIn('class="rio-anchor"', self.microsite)
        self.assertNotIn('class="rio-anchor-title"', self.microsite)
        for label in (
            "Overview",
            "Why Moxa",
            "Portfolio",
            "Applications",
            "Selection Guide",
            "Contact Us",
        ):
            self.assertIn(f">{label}</a>", self.microsite)
        self.assertRegex(
            self.microsite_css,
            r"\.rio-anchor-inner\s*\{[^}]*justify-content:\s*flex-start;[^}]*"
            r"gap:\s*4px;",
        )
        self.assertRegex(
            self.microsite_css,
            r"\.rio-anchor-links\s+a\s*\{[^}]*height:\s*56px;[^}]*"
            r"padding-inline:\s*17px;[^}]*font-weight:\s*800;",
        )

    def test_application_card_titles_stay_white_over_images(self):
        self.assertRegex(
            self.microsite_css,
            r'body\[data-moxa-page="microsite"\]\s+'
            r'\.rio-application-grid\s+h3\s*\{[^}]*color:\s*'
            r'(?:#fff(?:fff)?|var\(--rio-white\))\s*;',
        )

    def test_hero_metrics_use_four_equal_aligned_columns(self):
        self.assertRegex(
            self.microsite_css,
            r'\.rio-metrics\s*\{[^}]*grid-template-columns:\s*'
            r'repeat\(4,\s*minmax\(0,\s*1fr\)\)[^}]*\}',
        )
        self.assertRegex(
            self.microsite_css,
            r'\.rio-metrics\s+div\s*\{[^}]*display:\s*grid;[^}]*'
            r'grid-template-rows:\s*[^;]+;[^}]*\}',
        )
        self.assertRegex(
            self.microsite_css,
            r'\.rio-metrics\s+dt\s*\{[^}]*font-size:\s*'
            r'clamp\(0\.98rem,\s*1\.18vw,\s*1\.15rem\);',
        )
        self.assertRegex(
            self.microsite_css,
            r'\.rio-metrics\s+dd\s*\{[^}]*font-size:\s*9\.5px;',
        )

    def test_annotated_headings_have_deterministic_desktop_wrapping(self):
        self.assertIn(
            '<h2 class="rio-brochure-title" id="brochureTitle">The whole portfolio in five pages</h2>',
            self.microsite,
        )
        self.assertIn('class="rio-heading-nowrap" id="applicationsTitle"', self.microsite)
        self.assertIn('class="rio-heading-nowrap" id="comparisonTitle"', self.microsite)
        self.assertRegex(
            self.microsite_css,
            r'\.rio-heading-nowrap\s*\{[^}]*white-space:\s*nowrap;',
        )
        self.assertRegex(
            self.microsite_css,
            r'\.rio-brochure-title\s*\{[^}]*white-space:\s*nowrap;',
        )

    def test_application_card_copy_uses_a_shared_alignment_grid(self):
        self.assertRegex(
            self.microsite_css,
            r'\.rio-application-grid\s+article\s*>\s*div\s*\{[^}]*'
            r'display:\s*grid;[^}]*grid-template-rows:\s*[^;]+;',
        )

    def test_application_card_title_and_body_share_fixed_top_baselines(self):
        self.assertRegex(
            self.microsite_css,
            r'\.rio-application-grid\s+article\s*>\s*div\s*\{[^}]*'
            r'height:\s*126px;[^}]*grid-template-rows:\s*48px\s+1fr;'
            r'[^}]*align-content:\s*start;',
        )
        self.assertRegex(
            self.microsite_css,
            r'body\[data-moxa-page="microsite"\]\s+'
            r'\.rio-application-grid\s+h3\s*\{[^}]*margin:\s*0;',
        )

    def test_contact_heading_has_design_system_body_spacing(self):
        self.assertRegex(
            self.microsite_css,
            r'\.rio-contact-aside\s*>\s*h2\s*\+\s*p\s*\{[^}]*'
            r'margin-top:\s*var\(--rio-heading-body-gap\)\s*!important;',
        )

    def test_section_headings_share_one_body_spacing_token(self):
        self.assertRegex(
            self.microsite_css,
            r':root\s*\{[^}]*--rio-heading-body-gap:\s*28px\s*;',
        )
        for selector in (
            ".rio-section-head > h2 + p",
            ".rio-section-copy > h2 + p",
            ".rio-brochure-copy > h2 + p",
            ".rio-contact-aside > h2 + p",
        ):
            escaped = re.escape(selector).replace(r"\\ ", r"\s*")
            self.assertRegex(
                self.microsite_css,
                escaped
                + r'\s*\{[^}]*margin-top:\s*'
                + r'var\(--rio-heading-body-gap\)\s*!important;',
                selector,
            )


if __name__ == "__main__":
    unittest.main()
