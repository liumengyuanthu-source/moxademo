import pathlib
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[1]


class EDS4008ModelPagesContract(unittest.TestCase):
    def test_model_pages_use_shared_spec_template_and_text_only_hero(self):
        expected = {
            "eds-4008-lv.html": ["EDS-4008-LV", "Managed Ethernet switch", "9.6 to 60 VDC"],
            "eds-4008-hv.html": ["EDS-4008-HV", "Managed Ethernet switch", "88 to 300 VDC"],
            "eds-4008-lv-t.html": ["EDS-4008-LV-T", "Managed Ethernet switch", "−40 to 75°C"],
        }

        for filename, phrases in expected.items():
            html = (ROOT / filename).read_text(encoding="utf-8")
            with self.subTest(filename=filename):
                self.assertIn("assets/css/moxa-ds.css", html)
                self.assertIn("assets/css/eds-4008-model.css", html)
                self.assertIn("assets/js/moxa-shell.js", html)
                self.assertIn("assets/js/eds-4008-model.js", html)
                self.assertIn("data-sitecore-component=\"ModelHero\"", html)
                self.assertIn("data-sitecore-template=\"ProductModelSpecificationPage\"", html)
                self.assertIn("data-eds-model-app", html)
                self.assertNotIn("<img", html)
                self.assertNotIn("Compare all models", html)
                self.assertNotIn("Download datasheet</a>", html.split("</section>", 1)[0])
                for phrase in phrases:
                    self.assertIn(phrase, html + (ROOT / "assets/js/eds-4008-model.js").read_text(encoding="utf-8"))

    def test_download_print_and_conversion_actions_are_implemented(self):
        js = (ROOT / "assets/js/eds-4008-model.js").read_text(encoding="utf-8")
        self.assertIn("moxa-eds-4008-series-datasheet-v1.8.pdf", js)
        self.assertIn("data-print-page", js)
        self.assertIn("window.print()", js)
        self.assertIn("moxa:model:download", js)
        self.assertIn("moxa:quote:add", js)
        self.assertIn("StructuredSpecifications", js)
        self.assertIn("ModelConversionCTA", js)
        self.assertIn("PWR-100-LV", js)
        self.assertIn("PWR-105-HV-I", js)
        self.assertIn("Telcordia Standard SR-332", js)

    def test_series_page_links_to_lv_t_model_page(self):
        html = (ROOT / "product-series-eds-4008.html").read_text(encoding="utf-8")
        self.assertIn('<a href="eds-4008-lv-t.html">EDS-4008-LV-T</a>', html)
        self.assertGreaterEqual(html.count('href="eds-4008-lv-t.html"'), 2)

    def test_global_shell_includes_lv_t_navigation(self):
        shell = (ROOT / "assets/js/moxa-shell.js").read_text(encoding="utf-8")
        self.assertIn('"eds-4008-lv-t"', shell)
        self.assertIn('["EDS-4008-LV-T", "eds-4008-lv-t.html"]', shell)


if __name__ == "__main__":
    unittest.main()
