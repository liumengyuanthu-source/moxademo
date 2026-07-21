from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "article.html"
CSS = ROOT / "assets/css/article-page.css"
JS = ROOT / "assets/js/article-page.js"


class ArticlePageContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = HTML.read_text(encoding="utf-8")

    def test_uses_shared_moxa_shell_and_article_assets(self):
        self.assertIn('data-moxa-page="article"', self.html)
        self.assertIn('assets/css/moxa-ds.css', self.html)
        self.assertIn('assets/css/article-page.css', self.html)
        self.assertIn('assets/js/moxa-shell.js', self.html)
        self.assertIn('assets/js/article-page.js', self.html)
        self.assertNotIn('<footer class="site-footer"', self.html)
        shell = (ROOT / "assets/js/moxa-shell.js").read_text(encoding="utf-8")
        self.assertIn('article: [', shell)
        self.assertIn('["Taking TSN to the Real World", null]', shell)

    def test_preserves_complete_source_article_structure(self):
        required = [
            "Taking the Proven Benefits of Time-sensitive Networking to the Real World",
            "Technical Achievements",
            "Proven Network Redundancy",
            "Wireless Possibilities Unleashed",
            "Taking the Technology Further",
            "Reduce the Total Cost of Ownership in Wafer Manufacturing",
            "Minimize the Inconvenience of Downtime With Video Component Logging",
            "How TSN Helps",
            "Use Case 1: Machinery Manufacturer",
            "Use Case 2: Mass Customization Production System",
            "Boundless Benefits",
            "Machine Builders",
            "System Integrators",
            "End-Users",
            "Preparing for TSN Adoption",
            "Summary",
            "Tags",
            "Was this article informative for you?",
            "More Articles",
        ]
        for text in required:
            with self.subTest(text=text):
                self.assertEqual(self.html.count(text), 1)

    def test_uses_only_local_article_media(self):
        expected = [
            "assets/article/theo-lai.jpg",
            "assets/article/moxa-tsn-202212.jpg",
            "assets/article/tsn-video-thumbnail.jpg",
            "assets/article/tsn-network-topology.jpg",
        ]
        for src in expected:
            with self.subTest(src=src):
                self.assertIn(f'src="{src}"', self.html)
                self.assertTrue((ROOT / src).is_file())
        remote_images = re.findall(r'<img[^>]+src="https?://', self.html)
        self.assertEqual(remote_images, [])

    def test_has_editorial_navigation_and_accessible_controls(self):
        self.assertGreaterEqual(self.html.count('data-toc-link'), 6)
        self.assertGreaterEqual(self.html.count('data-article-section'), 6)
        self.assertIn('id="articleProgress"', self.html)
        self.assertIn('aria-label="Article reading progress"', self.html)
        self.assertIn('data-save-article', self.html)
        self.assertIn('data-copy-link', self.html)
        self.assertEqual(self.html.count('data-rating'), 5)
        self.assertIn('aria-live="polite"', self.html)

    def test_article_styles_and_interactions_are_separate_files(self):
        self.assertTrue(CSS.is_file())
        self.assertTrue(JS.is_file())
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")
        self.assertIn(".article-layout", css)
        self.assertIn("@media (max-width: 760px)", css)
        self.assertIn("IntersectionObserver", js)
        self.assertIn("navigator.clipboard", js)
        self.assertIn("sessionStorage", js)

    def test_rating_controls_use_five_balanced_face_options(self):
        css = CSS.read_text(encoding="utf-8")
        expected = [
            ("very-uninformative", "Very uninformative"),
            ("uninformative", "Uninformative"),
            ("neutral", "Neutral"),
            ("informative", "Informative"),
            ("very-informative", "Very informative"),
        ]
        for rating, label in expected:
            with self.subTest(rating=rating):
                self.assertIn(f'data-rating="{rating}"', self.html)
                self.assertIn(f'aria-label="{label}"', self.html)
                self.assertIn(f"<span>{label}</span>", self.html)
        self.assertEqual(self.html.count('class="rating-face"'), 5)
        self.assertIn("width: 126px;", css)
        self.assertIn("height: 86px;", css)
        self.assertIn(".article-rating button svg", css)
        self.assertIn(".article-rating button[data-rating=\"very-uninformative\"]", css)

    def test_related_articles_keep_images_and_compact_titles(self):
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")
        related = self.html.split('<section class="article-related"', 1)[1]
        self.assertEqual(related.count("<img "), 3)
        expected_sources = [
            "assets/campaign-security/moxa-secure-network-portfolio.png",
            "assets/microsite/application-1.jpg",
            "assets/home/Machine-OEM-553x375.jpg",
        ]
        for src in expected_sources:
            with self.subTest(src=src):
                self.assertIn(f'src="{src}"', related)
                self.assertTrue((ROOT / src).is_file())
        self.assertIn(".article-related-card-media", css)
        self.assertIn("font-size: 17px;", css)
        self.assertIn('data-related-track', related)
        self.assertIn('data-related-prev', related)
        self.assertIn('data-related-next', related)
        self.assertIn("scrollBy", js)
        self.assertIn("scroll-snap-align", css)

    def test_related_article_carousel_uses_refined_disabled_navigation(self):
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")
        related = self.html.split('<section class="article-related"', 1)[1]

        self.assertIn('class="article-carousel-button"', related)
        self.assertIn('disabled aria-disabled="true"', related)
        self.assertIn(".article-related-nav button:disabled", css)
        self.assertIn("cursor: not-allowed;", css)
        self.assertIn("updateRelatedNav", js)
        self.assertIn("cards.length <= 3", js)
        self.assertIn("button.disabled =", js)
        self.assertIn('button.setAttribute("aria-disabled"', js)
        self.assertIn("cardWidth + gap", js)

    def test_article_video_plays_in_page_without_bottom_caption(self):
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")
        self.assertIn('data-video-open', self.html)
        self.assertIn('data-video-modal', self.html)
        self.assertIn('data-video-frame', self.html)
        self.assertIn('tsn-real-world-cases-tiia-2020', self.html)
        video_block = self.html.split('class="article-video"', 1)[1].split('</button>', 1)[0]
        self.assertIn('class="article-video-play"', video_block)
        self.assertNotIn('Watch the TSN demonstration</strong><span>', video_block)
        self.assertIn(".article-video-play", css)
        self.assertIn("openVideoModal", js)

    def test_embeds_structured_tsn_faq_with_global_accordion_interaction(self):
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")
        self.assertIn('id="faq"', self.html)
        self.assertIn('Frequently Asked Questions', self.html)
        self.assertNotIn('Frequently Asked Questions About TSN', self.html)
        self.assertIn('data-article-faq', self.html)
        self.assertEqual(self.html.count('class="article-faq-item'), 3)
        expected_questions = [
            "What is the difference between TSN and Ethernet?",
            "How can TSN benefit my industrial applications?",
            "Why is building a unified network with TSN critical to IT/OT Convergence?",
        ]
        for question in expected_questions:
            with self.subTest(question=question):
                self.assertIn(question, self.html)
        self.assertIn("Traditional Fragmented Networks", self.html)
        self.assertIn("TSN Unified Networks", self.html)
        self.assertIn('type="application/ld+json"', self.html)
        self.assertIn('"@type": "FAQPage"', self.html)
        self.assertIn(".article-faq", css)
        self.assertIn(".article-faq-icon", css)
        self.assertIn("padding: 20px 28px 28px;", css)
        self.assertIn("toggleFaq", js)
        self.assertIn("aria-expanded", js)


if __name__ == "__main__":
    unittest.main()
