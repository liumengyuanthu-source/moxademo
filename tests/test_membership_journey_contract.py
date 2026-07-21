from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "homepage.html"
MEMBERSHIP = ROOT / "membership-signup.html"
SHELL = ROOT / "assets/js/moxa-shell.js"
CSS = ROOT / "assets/css/membership-signup.css"
JS = ROOT / "assets/js/membership-signup.js"
MODAL_JS = ROOT / "assets/js/membership-modal.js"


class MembershipJourneyContractTests(unittest.TestCase):
    def test_homepage_keeps_only_header_signin_entry_for_anonymous_visitors(self):
        html = HOME.read_text(encoding="utf-8")
        self.assertIn('data-visitor-state="anonymous"', html)
        self.assertIn('href="#my-moxa-signup"', html)
        self.assertIn('>Sign In</a>', html)
        self.assertIn('id="myMoxaSignupModal"', html)
        self.assertIn('role="dialog"', html)
        self.assertIn('aria-modal="true"', html)
        self.assertIn('data-workflow="anonymous-membership-registration"', html)
        self.assertNotIn('class="anonymous-visitor-journey"', html)
        self.assertNotIn('data-journey-step="anonymous-homepage"', html)
        self.assertNotIn('data-analytics-event="membership_start"', html)

    def test_homepage_signup_modal_uses_lightweight_existing_account_entry(self):
        html = HOME.read_text(encoding="utf-8")
        self.assertIn('Already have an account?', html)
        self.assertIn('href="https://www.moxa.com/membership/sign-in"', html)
        self.assertIn('>Sign in</a>', html)
        self.assertNotIn('class="member-signin-card"', html)
        self.assertNotIn('Existing member', html)
        self.assertNotIn('Already registered?', html)

    def test_membership_is_modal_only_and_has_no_public_standalone_route(self):
        shell = SHELL.read_text(encoding="utf-8")
        self.assertFalse(MEMBERSHIP.exists())
        self.assertNotIn("membership-signup.html", shell)
        self.assertIn('href="homepage.html#my-moxa-signup">Sign In</a>', shell)
        self.assertTrue(CSS.is_file())
        self.assertTrue(JS.is_file())

    def test_homepage_modal_contains_complete_registration_workflow(self):
        html = HOME.read_text(encoding="utf-8")
        self.assertIn('data-workflow="anonymous-membership-registration"', html)
        self.assertIn('data-step="account-details"', html)
        self.assertIn('data-step="profile-confirmation"', html)
        self.assertIn('data-step="membership-complete"', html)
        self.assertIn('id="member-first-name"', html)
        self.assertIn('id="member-business-email"', html)
        self.assertIn('id="member-company"', html)
        self.assertIn('id="member-country"', html)
        self.assertIn('id="member-password"', html)
        self.assertIn('id="membershipSubmit"', html)
        self.assertIn('data-analytics-event="membership_registration_submit"', html)
        self.assertNotIn("member-payload-card", html)
        self.assertNotIn("memberSyncPayload", html)

    def test_homepage_modal_supports_accessible_open_and_close_behaviors(self):
        html = HOME.read_text(encoding="utf-8")
        js = MODAL_JS.read_text(encoding="utf-8")
        self.assertIn('assets/css/membership-signup.css', html)
        self.assertIn('assets/js/membership-signup.js', html)
        self.assertIn('assets/js/membership-modal.js', html)
        self.assertIn('data-member-modal-close', html)
        self.assertIn('event.key === "Escape"', js)
        self.assertIn('event.target === modal', js)
        self.assertIn('location.hash === "#my-moxa-signup"', js)
        self.assertIn('previousFocus.focus()', js)
        self.assertIn('querySelectorAll("[data-member-modal-close]")', js)

    def test_completed_progress_steps_keep_numeric_labels_visible(self):
        css = CSS.read_text(encoding="utf-8")
        self.assertNotIn('.member-step.is-complete span::before', css)
        self.assertNotIn('content: "✓"', css)
        self.assertNotIn("font-size: 0", css)
        self.assertIn(".member-step.is-complete span", css)

    def test_signup_interaction_script_generates_profile_payload(self):
        js = JS.read_text(encoding="utf-8")
        self.assertIn("buildMembershipPayload", js)
        self.assertIn("membershipId", js)
        self.assertIn("moxa:membership:registered", js)
        self.assertIn("syncMembershipPayloadToCrm", js)
        self.assertIn("latestMembershipPayload", js)
        self.assertIn("crmSystem", js)
        self.assertIn("sessionStorage", js)
        self.assertIn("setStep", js)


if __name__ == "__main__":
    unittest.main()
