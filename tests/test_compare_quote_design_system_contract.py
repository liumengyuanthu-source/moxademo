from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "compare-quote.html"
CSS = ROOT / "assets/css/compare-quote.css"
JS = ROOT / "assets/js/compare-quote.js"
SHELL = ROOT / "assets/js/moxa-shell.js"


class CompareQuoteDesignSystemContract(unittest.TestCase):
    def setUp(self):
        self.html = HTML.read_text(encoding="utf-8")

    def test_page_uses_shared_shell_and_page_specific_assets(self):
        self.assertIn('data-moxa-page="compare-quote"', self.html)
        self.assertIn('assets/css/moxa-ds.css', self.html)
        self.assertIn('assets/css/compare-quote.css', self.html)
        self.assertIn('assets/js/moxa-shell.js', self.html)
        self.assertIn('assets/js/compare-quote.js', self.html)
        self.assertNotIn('class="moxa-locale-shell"', self.html)
        self.assertNotIn('class="moxa-demo-criteria"', self.html)
        self.assertNotIn('class="site-footer"', self.html)

    def test_workflow_covers_products_accessory_requester_and_crm_submission(self):
        for token in [
            'id="quoteWorkflow"',
            'data-quote-step="cart"',
            'data-quote-step="accessory"',
            'data-quote-step="requester"',
            'data-quote-step="submitted"',
            "EDS-4008-LV",
            "EDS-4008-HV",
            "SFP-1GEZXLC",
            'id="quoteRequesterForm"',
            'id="quoteConsent"',
            'data-action="submit-quote"',
            "Salesforce",
        ]:
            self.assertIn(token, self.html)

    def test_requester_form_uses_accessible_design_system_fields(self):
        for field_id in [
            "quoteFirstName",
            "quoteLastName",
            "quoteEmail",
            "quoteCompany",
            "quoteIndustry",
            "quoteCountry",
            "quoteProjectDetails",
        ]:
            self.assertIn(f'id="{field_id}"', self.html)
            self.assertIn(f'for="{field_id}"', self.html)
        self.assertIn('aria-live="polite"', self.html)

    def test_interaction_script_preserves_cart_and_emits_crm_ready_payload(self):
        script = JS.read_text(encoding="utf-8")
        for token in [
            "quote_item_add",
            "quote_accessory_add",
            "quote_submit",
            "SFP-1GEZXLC",
            "salesforce",
            "sessionStorage",
            "setStep",
        ]:
            self.assertIn(token, script)

    def test_visual_contract_uses_readable_contrast_and_shared_alignment(self):
        css = CSS.read_text(encoding="utf-8")
        self.assertIn("var(--moxa-content)", css)
        self.assertIn("color: var(--moxa-white)", css)
        self.assertIn(".quote-form-grid", css)
        self.assertIn("@media (prefers-reduced-motion: reduce)", css)

    def test_shared_shell_has_quote_breadcrumb(self):
        shell = SHELL.read_text(encoding="utf-8")
        self.assertIn('"compare-quote": [', shell)
        self.assertIn('["Request a Quote", null]', shell)


if __name__ == "__main__":
    unittest.main()
