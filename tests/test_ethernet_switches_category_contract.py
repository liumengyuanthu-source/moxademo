from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "product-category-ethernet-switches.html"


class EthernetSwitchesCategoryContract(unittest.TestCase):
    def setUp(self):
        self.html = HTML.read_text(encoding="utf-8")

    def test_as_is_category_content_is_fully_covered(self):
        self.assertIn('data-moxa-page="ethernet-switches"', self.html)
        self.assertIn("PRODUCT CATEGORIES (9)", self.html)
        self.assertEqual(self.html.count('class="ethernet-category-card'), 9)
        for name in [
            "Unmanaged Switches",
            "Layer 2 Smart Switches",
            "Layer 2 Managed Switches",
            "Layer 3 Managed Switches",
            "PoE Switches",
            "EN 50155 Switches",
            "Rackmount Switches",
            "Ethernet Embedded Modules",
            "Two-wire Ethernet Switches (SPE/APL)",
        ]:
            self.assertIn(name, self.html)

        for phrase in [
            "industrial-grade reliability, network redundancy, strengthened security",
            "large portfolio of industrial unmanaged switches",
            "smart switches simplify daily tasks",
            "IEC 62443 standard",
            "up to 90 W output per port",
            "IRIS-certified company",
            "24 to 64-port routing and up to 10GbE switching capabilities",
            "designed for device manufacturers",
            "Single Pair Ethernet (SPE) and Ethernet-APL",
        ]:
            self.assertIn(phrase, self.html)

    def test_left_filter_matches_as_is_behavior_and_new_design_system(self):
        for token in [
            "SEARCH BY",
            "Total No. of Ports",
            "0 - 64",
            "-- Highest Speed --",
            "Connections",
            "DSL",
            "Fiber",
            "M12",
            "PoE",
            "PTP",
            "Physical Characteristics",
            "Advanced Options",
        ]:
            self.assertIn(token, self.html)

        self.assertIn("data-ethernet-filter", self.html)
        self.assertIn("data-category-count", self.html)
        self.assertIn("data-ethernet-reset", self.html)
        self.assertIn("data-ethernet-port-range", self.html)
        self.assertIn("data-port-min", self.html)

    def test_category_interaction_script_filters_cards_and_preserves_counts(self):
        self.assertIn("applyEthernetFilters", self.html)
        self.assertIn("category.classList.toggle('is-hidden'", self.html)
        self.assertIn("visibleCount.textContent", self.html)
        self.assertIn("aria-pressed", self.html)
        self.assertIn("portRange.addEventListener('input'", self.html)

    def test_selected_concept_three_is_the_visual_contract(self):
        self.assertIn('data-selected-concept="3"', self.html)
        self.assertNotIn('class="ethernet-hero-visual"', self.html)
        self.assertNotIn('class="ethernet-hero-actions"', self.html)
        self.assertNotIn('banner/hero-media/01-product-category-ethernet-switches.png', self.html)
        self.assertNotIn('class="ethernet-category-meta"', self.html)
        self.assertNotIn('class="ethernet-category-action"', self.html)
        self.assertEqual(self.html.count('class="ethernet-category-title"'), 9)
        self.assertEqual(self.html.count('class="ethernet-category-description"'), 9)

    def test_selected_concept_three_keeps_a_compact_accessible_results_state(self):
        self.assertIn('id="ethernet-product-categories"', self.html)
        self.assertIn('aria-live="polite"', self.html)
        self.assertIn('class="ethernet-no-results"', self.html)
        self.assertIn("noResults.hidden = shown !== 0", self.html)


if __name__ == "__main__":
    unittest.main()
