"""
PITCH'D API Tests - Iteration 3
Tests for the screenplay analysis API with dual-mode prompts:
- Script mode (>= 1000 chars): Uses Dr. Scrypto prompt
- Concept mode (< 1000 chars): Uses development exec prompt
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Sample texts for testing
CONCEPT_TEXT = """
A retired hitman living in a quiet suburban neighborhood discovers that his new neighbor 
is actually the son of a crime boss he killed years ago. When the young man starts 
investigating his father's death, the hitman must decide whether to eliminate this threat 
or finally face the consequences of his past. Set in modern-day Chicago, this thriller 
explores themes of redemption, guilt, and the impossibility of escaping one's history.
The hitman, now going by the name "Frank Miller," has built a new life as a woodworking 
teacher at the local community college. His peaceful existence is shattered when 
Marcus Delgado moves in next door.
"""  # ~600 chars - concept mode

SCRIPT_TEXT = """
FADE IN:

EXT. SUBURBAN STREET - DAY

A quiet tree-lined street in a middle-class Chicago neighborhood. 
Leaves fall gently. A MOVING TRUCK pulls up to a modest two-story house.

FRANK MILLER (60s), weathered face, calloused hands, watches from 
his porch across the street. He sips coffee, seemingly relaxed, 
but his eyes track every movement with predatory precision.

MARCUS DELGADO (30s), sharp-featured, intense, steps out of a 
black sedan behind the truck. He surveys the neighborhood with 
the same watchful gaze as Frank.

FRANK
(to himself)
New neighbor.

He sets down his coffee. His hand trembles slightly.

INT. FRANK'S HOUSE - WORKSHOP - CONTINUOUS

Frank enters his basement workshop. Woodworking tools line the walls. 
He moves to a workbench, picks up a half-finished birdhouse.

His hands steady as he works. This is his meditation. His escape.

A PHOTO on the wall: Frank with STUDENTS at a community college. 
"WOODWORKING 101 - INSTRUCTOR: FRANK MILLER"

Another photo, older, hidden behind it: A younger Frank in military 
gear, face hard, eyes cold.

FRANK (V.O.)
Twenty years. Twenty years of building 
instead of breaking. Twenty years of 
teaching instead of taking.

He pauses, chisel in hand.

FRANK (V.O.) (CONT'D)
I thought I was done.

EXT. FRANK'S HOUSE - PORCH - LATER

Frank sits on his porch, pretending to read. Marcus approaches, 
carrying a six-pack of beer.

MARCUS
Hey there. Marcus Delgado. Just moved 
in across the street.

Frank looks up. Studies the young man's face. Something familiar 
in the bone structure. The set of the jaw.

FRANK
Frank. Frank Miller.

They shake hands. Marcus's grip is firm. Practiced.

MARCUS
Thought I'd introduce myself. Seems 
like a nice neighborhood.

FRANK
It is. Quiet. People mind their 
own business.

A beat. Marcus smiles, but it doesn't reach his eyes.

MARCUS
That's what I'm counting on.

He hands Frank a beer. Frank accepts it, though every instinct 
screams warning.

INT. MARCUS'S HOUSE - NIGHT

Marcus unpacks boxes. He opens one marked "PERSONAL" and pulls 
out a CASE FILE. The label reads: "DELGADO, VICTOR - HOMICIDE - UNSOLVED"

Inside: Crime scene photos. A man in his 50s, shot execution-style. 
Victor Delgado. Marcus's father.

Marcus pins the photos to a corkboard already covered with 
newspaper clippings, surveillance photos, and red string 
connecting various points.

One photo stands out: A BLURRY IMAGE of a man leaving a building. 
The timestamp: 15 years ago.

MARCUS
(to the photo)
I know you're out there. And I'm 
going to find you.

He circles the blurry figure with a red marker.

INT. COMMUNITY COLLEGE - WOODWORKING CLASSROOM - DAY

Frank teaches a class of ADULT STUDENTS. He demonstrates proper 
chisel technique with practiced ease.

FRANK
The key is patience. You can't force 
the wood. You have to work with it, 
understand its grain, its nature.

He looks up. Through the window, he sees Marcus's car in the 
parking lot. Marcus sits inside, watching.

Frank's hand tightens on the chisel.

STUDENT
Mr. Miller? You okay?

FRANK
(recovering)
Fine. Just... remembered something.

He continues the demonstration, but his mind is elsewhere.

EXT. COMMUNITY COLLEGE - PARKING LOT - LATER

Frank exits the building. Marcus's car is gone. But on Frank's 
windshield: a BUSINESS CARD.

"MARCUS DELGADO - PRIVATE INVESTIGATOR"

On the back, handwritten: "We should talk about the old neighborhood."

Frank's face hardens. The mask of the kindly teacher slips, 
revealing something darker beneath.

INT. FRANK'S HOUSE - NIGHT

Frank sits in darkness. On the table before him: a LOCKBOX. 
He hasn't opened it in fifteen years.

His hands hover over the combination lock.

FRANK (V.O.)
I made a promise. To myself. To God, 
if he's listening. Never again.

He enters the combination. The lock clicks open.

Inside: A PISTOL. Cleaning kit. Ammunition. And a PHOTO of 
Victor Delgado, alive, taken through a rifle scope.

FRANK (V.O.) (CONT'D)
But some promises are made to be broken.

He picks up the gun. It fits his hand like it never left.

FADE TO BLACK.

END OF ACT ONE
"""  # ~3500 chars - script mode


class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_returns_ok(self):
        """Test that /api/health returns status ok"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"


class TestAnalyseEndpointValidation:
    """Input validation tests for /api/analyse"""
    
    def test_empty_text_returns_400(self):
        """Test that empty text returns 400 error"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": ""},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "error" in data
        assert "message" in data["error"]
    
    def test_whitespace_only_returns_400(self):
        """Test that whitespace-only text returns 400 error"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": "   \n\t  "},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "error" in data
    
    def test_missing_text_field_returns_400(self):
        """Test that missing text field returns 400 error"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400


class TestConceptMode:
    """Tests for concept mode (text < 1000 chars)"""
    
    def test_concept_mode_returns_valid_json_structure(self):
        """Test concept mode returns all required fields"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": CONCEPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=60  # AI calls can take time
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields are present
        assert "primaryTitle" in data, "Missing primaryTitle"
        assert "altTitles" in data, "Missing altTitles"
        assert "loglines" in data, "Missing loglines"
        assert "taglines" in data, "Missing taglines"
        assert "synopsis" in data, "Missing synopsis"
        
        # Verify new fields added in this iteration
        assert "genre" in data, "Missing genre field"
        assert "subgenres" in data, "Missing subgenres field"
        assert "tone" in data, "Missing tone field"
        assert "time_period" in data, "Missing time_period field"
        assert "setting" in data, "Missing setting field"
        
        # Verify data types
        assert isinstance(data["primaryTitle"], str)
        assert isinstance(data["altTitles"], list)
        assert len(data["altTitles"]) >= 1, "Should have at least 1 alt title"
        assert isinstance(data["loglines"], list)
        assert len(data["loglines"]) >= 1, "Should have at least 1 logline"
        assert isinstance(data["taglines"], list)
        assert len(data["taglines"]) >= 1, "Should have at least 1 tagline"
        assert isinstance(data["synopsis"], str)
        assert len(data["synopsis"]) > 100, "Synopsis should be substantial"
        
        # Verify new field types
        assert isinstance(data["genre"], str)
        assert isinstance(data["subgenres"], list)
        assert isinstance(data["tone"], str)
        assert isinstance(data["time_period"], str)
        assert isinstance(data["setting"], str)


class TestScriptMode:
    """Tests for script mode (text >= 1000 chars)"""
    
    def test_script_mode_returns_valid_json_structure(self):
        """Test script mode returns all required fields"""
        # Ensure we have >= 1000 chars
        assert len(SCRIPT_TEXT) >= 1000, f"Script text should be >= 1000 chars, got {len(SCRIPT_TEXT)}"
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": SCRIPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=90  # Script mode may take longer
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields are present
        assert "primaryTitle" in data, "Missing primaryTitle"
        assert "altTitles" in data, "Missing altTitles"
        assert "loglines" in data, "Missing loglines"
        assert "taglines" in data, "Missing taglines"
        assert "synopsis" in data, "Missing synopsis"
        
        # Verify new fields
        assert "genre" in data, "Missing genre field"
        assert "subgenres" in data, "Missing subgenres field"
        assert "tone" in data, "Missing tone field"
        assert "time_period" in data, "Missing time_period field"
        assert "setting" in data, "Missing setting field"
        
        # Verify data types and content
        assert isinstance(data["primaryTitle"], str)
        assert len(data["primaryTitle"]) > 0
        
        assert isinstance(data["altTitles"], list)
        assert len(data["altTitles"]) >= 1
        
        assert isinstance(data["loglines"], list)
        assert len(data["loglines"]) >= 1
        for logline in data["loglines"]:
            assert isinstance(logline, str)
            assert len(logline) > 10
        
        assert isinstance(data["taglines"], list)
        assert len(data["taglines"]) >= 1
        
        assert isinstance(data["synopsis"], str)
        assert len(data["synopsis"]) > 200, "Script mode synopsis should be 400-500 words"


class TestModeThreshold:
    """Tests for the 1000 character threshold between modes"""
    
    def test_999_chars_uses_concept_mode(self):
        """Text with exactly 999 chars should use concept mode"""
        # Create text that's exactly 999 chars
        text_999 = "A " * 499 + "x"  # 999 chars
        assert len(text_999) == 999
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": text_999},
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        # Should succeed (concept mode)
        assert response.status_code == 200
        data = response.json()
        assert "primaryTitle" in data
    
    def test_1000_chars_uses_script_mode(self):
        """Text with exactly 1000 chars should use script mode"""
        # Create text that's exactly 1000 chars
        text_1000 = "A " * 500  # 1000 chars
        assert len(text_1000) == 1000
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": text_1000},
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        # Should succeed (script mode)
        assert response.status_code == 200
        data = response.json()
        assert "primaryTitle" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
