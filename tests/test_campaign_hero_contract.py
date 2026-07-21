from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "campaign.html"
HERO_ASSET = ROOT / "assets/campaign-security/secure-network-selection-guide.jpg"


class CampaignHeroContractTests(unittest.TestCase):
    def setUp(self):
        self.html = HTML.read_text(encoding="utf-8")

    def test_selected_option_a_uses_the_provided_image_first_banner(self):
        self.assertIn('class="campaign-hero"', self.html)
        self.assertIn('data-selected-concept="A"', self.html)
        self.assertIn('secure-network-selection-guide.jpg', self.html)
        self.assertTrue(HERO_ASSET.is_file())

    def test_hero_keeps_core_conversion_actions_without_proof_chips(self):
        self.assertIn('href="#contact-us">Contact Us</a>', self.html)
        self.assertIn('href="#portfolio"', self.html)
        self.assertNotIn('class="hero-proof"', self.html)
        self.assertNotIn('IEC 62443-4-1 SDL', self.html)
        self.assertNotIn('35+ Years in Industrial Automation', self.html)

    def test_hero_heading_can_wrap_responsively_without_a_forced_break(self):
        self.assertIn('Security Embedded, Operations Empowered', self.html)
        self.assertNotIn('Security Embedded,<br>Operations Empowered', self.html)


if __name__ == "__main__":
    unittest.main()
