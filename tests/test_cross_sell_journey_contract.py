from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
EDS = ROOT / "product-series-eds-4008.html"
NPORT = ROOT / "nport-5100-series.html"
CSS = ROOT / "assets/css/moxa-cross-sell.css"
JS = ROOT / "assets/js/moxa-cross-sell.js"


class CrossSellJourneyContract(unittest.TestCase):
    def setUp(self):
        self.eds = EDS.read_text(encoding="utf-8")
        self.nport = NPORT.read_text(encoding="utf-8")

    def test_nport_recommends_eds_with_explainable_architecture(self):
        self.assertIn('data-cross-sell-product="nport-5100"', self.nport)
        self.assertIn("Recommended solution component", self.nport)
        self.assertIn("Complete the Connection with a Managed Industrial Network", self.nport)
        self.assertIn("NPort 5100 brings serial devices onto Ethernet", self.nport)
        self.assertIn("EDS-4008 helps connect and manage them", self.nport)
        self.assertIn("View EDS-4008 Series", self.nport)
        self.assertIn("product-series-eds-4008.html?from=nport-5100&amp;journey=complete-architecture", self.nport)

    def test_eds_recommends_nport_with_explainable_architecture(self):
        self.assertIn('data-cross-sell-product="eds-4008"', self.eds)
        self.assertIn("Recommended solution component", self.eds)
        self.assertIn("Bring Legacy Serial Devices onto Your Ethernet Network", self.eds)
        self.assertIn("EDS-4008 provides the managed Ethernet backbone", self.eds)
        self.assertIn("NPort 5100 helps connect existing serial devices", self.eds)
        self.assertIn("View NPort 5100 Series", self.eds)
        self.assertIn("nport-5100-series.html?from=eds-4008&amp;journey=complete-architecture", self.eds)

    def test_both_pages_include_architecture_strip_transparency_and_context_banner(self):
        for html in [self.eds, self.nport]:
            for step in [
                "Legacy Serial Device",
                "NPort 5100 Series",
                "EDS-4008 Series",
                "Control Network",
            ]:
                self.assertIn(step, html)
            self.assertIn("Add Both to Solution", html)
            self.assertIn("Recommended as a complementary architecture", html)
            self.assertIn('data-cross-sell-context-banner hidden', html)
            self.assertIn("Continue architecture", html)

    def test_shared_assets_define_state_events_and_accessible_interactions(self):
        self.assertTrue(CSS.exists(), "shared cross-sell CSS should exist")
        self.assertTrue(JS.exists(), "shared cross-sell JS should exist")
        css = CSS.read_text(encoding="utf-8")
        js = JS.read_text(encoding="utf-8")

        for html in [self.eds, self.nport]:
            self.assertIn("assets/css/moxa-cross-sell.css", html)
            self.assertIn("assets/js/moxa-cross-sell.js", html)

        self.assertIn("MOXA_CROSS_SELL_RELATIONSHIPS", js)
        self.assertIn("moxaCrossSellJourney", js)
        for event_name in [
            "moxa_cross_sell_impression",
            "moxa_cross_sell_click",
            "moxa_cross_sell_arrive",
            "moxa_cross_sell_add_both",
            "moxa_cross_sell_return_to_source",
        ]:
            self.assertIn(event_name, js)
        self.assertIn("localStorage", js)
        self.assertIn("solutionProducts", js)
        self.assertIn('["nport-5100", "eds-4008"]', js)
        self.assertIn("Added to solution shortlist: NPort 5100 + EDS-4008", js)
        self.assertIn(".solution-cross-sell", css)
        self.assertIn(".cross-sell-context-banner", css)
        self.assertIn(".solution-toast", css)


if __name__ == "__main__":
    unittest.main()
