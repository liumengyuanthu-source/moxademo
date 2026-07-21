from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "homepage.html").read_text(encoding="utf-8")


class HomepageThirdBannerContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        match = re.search(
            r'<article class="hero-slide hero-slide-eds".*?</article>',
            HTML,
            flags=re.S,
        )
        if not match:
            raise AssertionError("EDS-4008 third banner is missing")
        cls.banner = match.group(0)

    def test_uses_new_image_first_asset(self):
        self.assertIn(
            'src="banner/eds-4008-validation-banner.png"', self.banner
        )

    def test_has_approved_copy_and_ctas(self):
        self.assertIn("Validate the right", self.banner)
        self.assertIn("Compare LV/HV Models", self.banner)
        self.assertIn("Download Datasheet", self.banner)
        self.assertIn('href="compare-lv-hv.html"', self.banner)
        self.assertIn(
            'href="asset/moxa-eds-4008-series-datasheet-v1.8.pdf"',
            self.banner,
        )

    def test_removes_visible_session_note(self):
        self.assertNotIn("Homepage C", self.banner)

    def test_runtime_routes_use_the_current_page_root(self):
        self.assertIn("var staticBase = '';", HTML)
        self.assertNotIn("moxa-figma-static-pages 4/", HTML)

    def test_explore_heading_keeps_the_core_together(self):
        self.assertIn(
            'from the edge to <span class="home-nowrap">the core.</span>',
            HTML,
        )
        self.assertRegex(
            HTML,
            r'\.home-nowrap\s*\{[^}]*white-space:\s*nowrap;',
        )

    def test_summer_sales_cta_variants_are_isolated(self):
        variants = re.findall(
            r'<article class="hero-slide hero-slide-summer.*?</article>',
            HTML,
            flags=re.S,
        )
        self.assertEqual(2, len(variants))
        for variant in variants:
            self.assertIn("2026 SUMMER SALES", variant)
            self.assertIn("Upgrade your industrial network this summer.", variant)
            self.assertIn(
                "Explore selected Moxa industrial networking solutions and get expert guidance for your next deployment.",
                variant,
            )
            self.assertIn('href="campaign.html#contact-us"', variant)
        self.assertIn('src="banner/homepage-summer-sales-a.png"', variants[0])
        self.assertIn('src="banner/homepage-summer-sales-b.png"', variants[1])
        self.assertIn('data-ab-variant="summer-sales-a"', variants[0])
        self.assertIn('data-ab-variant="summer-sales-b"', variants[1])
        self.assertIn("Inquire Now", variants[0])
        self.assertIn("Contact an Expert", variants[1])

    def test_summer_sales_carousel_has_five_dots(self):
        dots = re.findall(r'data-hero-dot="([0-4])"', HTML)
        self.assertEqual(["0", "1", "2", "3", "4"], dots)

    def test_explore_now_restores_machine_oem_and_remote_io(self):
        self.assertIn('src="img/scenario-manufacturing.jpg"', HTML)
        self.assertIn("Elevate Machinery Performance With Reliable Connectivity", HTML)
        self.assertIn('src="img/family-edge.jpg"', HTML)
        self.assertIn("Empowering Essential Industries With Reliable Remote I/O", HTML)
        self.assertNotIn('data-ab-variant="explore-rail-a"', HTML)
        self.assertNotIn('data-ab-variant="explore-power-b"', HTML)

    def test_summer_sales_variants_have_stable_review_urls(self):
        self.assertIn("var heroQueryMap = { summerA: 3, summerB: 4 };", HTML)
        self.assertRegex(
            HTML,
            r'if\(reduce \|\| heroSlides\.length < 2 \|\| s1HomepageState \|\| heroQuery \|\| experienceQuery\)\{ return; \}',
        )

    def test_formal_homepage_tracks_top_cta_experiment(self):
        self.assertEqual(2, HTML.count('data-experiment="experiment_top_cta"'))
        self.assertNotIn('data-experiment="experiment_explore_content"', HTML)
        self.assertEqual(1, HTML.count('data-experience-variant="A"'))
        self.assertEqual(1, HTML.count('data-experience-variant="B"'))
        self.assertIn('experience_variant: variant', HTML)
        self.assertIn('payload[experiment] = variant;', HTML)

    def test_experience_query_selects_matching_hero_only(self):
        self.assertIn("var experienceQuery = new URLSearchParams(window.location.search).get('experience');", HTML)
        self.assertIn("var experienceHeroMap = { A: 3, B: 4 };", HTML)
        self.assertNotIn("document.body.setAttribute('data-active-experience', experienceQuery);", HTML)
        self.assertNotIn('body[data-active-experience="A"]', HTML)
        self.assertNotIn('body[data-active-experience="B"]', HTML)


if __name__ == "__main__":
    unittest.main()
