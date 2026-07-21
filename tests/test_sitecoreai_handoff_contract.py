import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "handoff" / "sitecoreai"


def load_json(name):
    return json.loads((HANDOFF / name).read_text(encoding="utf-8"))


class SitecoreAIHandoffContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.components = load_json("component-manifest.json")
        cls.pages = load_json("page-compositions.json")
        cls.journeys = load_json("demo-journeys.json")
        cls.interactions = load_json("interaction-contract.json")

    def test_authoritative_scope(self):
        routes = self.pages["routes"]
        self.assertEqual(13, self.pages["routeCount"])
        self.assertEqual(12, self.pages["pageClassCount"])
        self.assertEqual(13, len(routes))
        self.assertEqual(12, sum(route["deploymentTarget"] == "SitecoreAI" for route in routes))
        self.assertEqual(1, sum(route["deploymentTarget"] == "ExternalHtmlDemo" for route in routes))
        self.assertEqual(12, len({route["pageClass"] for route in routes}))

    def test_component_references_and_template_allow_lists(self):
        component_ids = {component["id"] for component in self.components["components"]}
        templates = {template["id"]: template for template in self.pages["templates"]}
        shared = {
            component
            for components in self.pages["sharedPartials"].values()
            for component in components
        }
        self.assertTrue(shared <= component_ids)
        for route in self.pages["routes"]:
            self.assertTrue(set(route["components"]) <= component_ids, route["route"])
            if route["deploymentTarget"] != "SitecoreAI":
                continue
            template = templates[route["template"]]
            self.assertTrue(
                set(route["components"]) <= set(template["allowedComponents"]),
                route["route"],
            )

    def test_shared_template_reuse(self):
        by_route = {route["route"]: route for route in self.pages["routes"]}
        self.assertEqual(
            by_route["product-series-eds-4008.html"]["template"],
            by_route["nport-5100-series.html"]["template"],
        )
        self.assertEqual(
            by_route["eds-4008-lv.html"]["template"],
            by_route["eds-4008-hv.html"]["template"],
        )
        compare = by_route["compare-lv-hv.html"]
        self.assertEqual("ExternalHtmlDemo", compare["deploymentTarget"])
        self.assertIsNone(compare["template"])

    def test_formal_routes_use_shared_design_system_shell(self):
        for route in self.pages["routes"]:
            path = ROOT / route["route"]
            self.assertTrue(path.exists(), route["route"])
            html = path.read_text(encoding="utf-8")
            self.assertRegex(html, r'assets/css/moxa-ds\.css(?:\?v=[^"\']+)?')
            self.assertRegex(html, r'assets/js/moxa-shell\.js(?:\?v=[^"\']+)?')

    def test_38_demo_operations_cover_six_stages(self):
        stages = self.journeys["stages"]
        operations = [operation for stage in stages for operation in stage["operations"]]
        self.assertEqual(6, self.journeys["journeyStageCount"])
        self.assertEqual(6, len(stages))
        self.assertEqual(38, self.journeys["operationDemoCount"])
        self.assertEqual(list(range(1, 39)), sorted(operation["id"] for operation in operations))
        self.assertTrue(all(operation["status"] in self.journeys["statusDefinitions"] for operation in operations))

    def test_local_demo_evidence_exists(self):
        ignored_prefixes = ("deliverables/", "http://", "https://")
        for stage in self.journeys["stages"]:
            for operation in stage["operations"]:
                for evidence in operation["evidence"]:
                    if evidence.startswith(ignored_prefixes):
                        continue
                    local = re.split(r"[?#]", evidence, maxsplit=1)[0]
                    self.assertTrue((ROOT / local).exists(), f"{operation['id']}: {evidence}")

    def test_search_default_uses_single_inferred_primary_facet(self):
        html = (ROOT / "search.html").read_text(encoding="utf-8")
        self.assertIn("function inferPrimaryFacet(term)", html)
        self.assertIn("datasheet|manual|document|pdf|hxml", html)
        self.assertIn("input.checked = input.getAttribute('data-search-facet') === primaryFacet", html)
        self.assertEqual(4, len(re.findall(r'data-search-facet="(?:products|documents|videos|campaigns)"', html)))

    def test_membership_registration_is_a_homepage_modal_component_only(self):
        component_ids = {component["id"] for component in self.components["components"]}
        homepage = next(route for route in self.pages["routes"] if route["route"] == "homepage.html")
        self.assertIn("MembershipRegistrationModal", component_ids)
        self.assertIn("MembershipRegistrationModal", homepage["components"])
        self.assertFalse((ROOT / "membership-signup.html").exists())
        self.assertEqual("homepage-modal-only", self.interactions["membershipRoutePolicy"])

    def test_interaction_contract_sources_and_routes_exist(self):
        formal_routes = {route["route"] for route in self.pages["routes"]}
        component_ids = {component["id"] for component in self.components["components"]}
        self.assertGreaterEqual(len(self.interactions["interactions"]), 10)
        for interaction in self.interactions["interactions"]:
            self.assertTrue(interaction["triggers"], interaction["id"])
            self.assertTrue(interaction["states"], interaction["id"])
            self.assertTrue(interaction["integrationBoundary"], interaction["id"])
            for route in interaction["routes"]:
                if route != "*":
                    self.assertTrue(
                        route in formal_routes or (ROOT / route).exists(),
                        interaction["id"],
                    )
            for source in interaction["source"]:
                self.assertTrue((ROOT / source).exists(), f"{interaction['id']}: {source}")
            for component in interaction["component"].split(","):
                if component == "QuoteWorkflow":
                    continue
                self.assertIn(component, component_ids, interaction["id"])


if __name__ == "__main__":
    unittest.main()
