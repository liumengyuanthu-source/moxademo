from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class RemoteIOContractTests(unittest.TestCase):
    def setUp(self):
        self.microsite = (ROOT / "microsite.html").read_text(encoding="utf-8")
        self.campaign = (ROOT / "campaign.html").read_text(encoding="utf-8")

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


if __name__ == "__main__":
    unittest.main()
