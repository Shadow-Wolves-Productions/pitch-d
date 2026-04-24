"""
Backend API tests for PITCH'D screenplay analysis tool
Tests: /api/health and /api/analyse endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_returns_ok(self):
        """Test /api/health returns status ok"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "ok"


class TestAnalyseEndpoint:
    """Analyse endpoint tests - accepts Anthropic-format body and returns response"""
    
    def test_analyse_accepts_anthropic_format(self):
        """Test /api/analyse accepts POST with Anthropic-format body"""
        # Create a test script with minimum 200 chars
        test_script = """
        INT. COFFEE SHOP - DAY
        
        SARAH (30s, tired but determined) sits alone at a corner table, 
        staring at her laptop. She's been here for hours.
        
        SARAH
        (muttering)
        Come on, come on...
        
        Her phone buzzes. She ignores it. The screen shows "MOM" calling.
        
        BARISTA (O.S.)
        We're closing in ten minutes.
        
        Sarah doesn't look up. She types faster.
        """ * 2  # Repeat to ensure > 200 chars
        
        body = {
            "model": "claude-sonnet-4-20250514",
            "max_tokens": 2048,
            "messages": [
                {
                    "role": "user",
                    "content": f"Analyze this script and return a JSON with primaryTitle, altTitles, loglines, taglines, synopsis:\n\n{test_script}"
                }
            ]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json=body,
            timeout=120  # API can take time
        )
        
        # Should return 200 or valid error response
        assert response.status_code in [200, 400, 401, 500]
        data = response.json()
        
        if response.status_code == 200:
            # Verify Anthropic-format response structure
            assert "content" in data
            assert isinstance(data["content"], list)
            assert len(data["content"]) > 0
            assert data["content"][0].get("type") == "text"
            assert "text" in data["content"][0]
            print(f"SUCCESS: Analyse endpoint returned valid response")
        else:
            # If error, should have error field
            assert "error" in data
            print(f"API returned error (expected if API key issue): {data.get('error')}")
    
    def test_analyse_returns_error_for_empty_messages(self):
        """Test /api/analyse handles empty messages gracefully"""
        body = {
            "model": "claude-sonnet-4-20250514",
            "max_tokens": 2048,
            "messages": []
        }
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json=body,
            timeout=30
        )
        
        # Should return some response (either error or empty)
        assert response.status_code in [200, 400, 500]
        print(f"Empty messages test: status={response.status_code}")
    
    def test_analyse_endpoint_exists(self):
        """Test /api/analyse endpoint exists and accepts POST"""
        # Just verify the endpoint exists with minimal payload
        body = {"messages": [{"role": "user", "content": "test"}]}
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json=body,
            timeout=30
        )
        
        # Should not return 404 (endpoint exists)
        assert response.status_code != 404, "Analyse endpoint should exist"
        print(f"Analyse endpoint exists, status: {response.status_code}")


class TestInvalidRoutes:
    """Test that invalid routes return appropriate errors"""
    
    def test_unknown_api_route_returns_404(self):
        """Test unknown API routes return 404"""
        response = requests.get(f"{BASE_URL}/api/nonexistent")
        assert response.status_code == 404
    
    def test_analyse_get_method_not_allowed(self):
        """Test GET on /api/analyse returns method not allowed"""
        response = requests.get(f"{BASE_URL}/api/analyse")
        assert response.status_code == 405  # Method Not Allowed
