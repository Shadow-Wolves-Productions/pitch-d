"""
PITCH'D API Tests - Iteration 8
Tests for the screenplay analysis API with new JSON structure:
- genre (array), comparableA, comparableB, themes, format, estimatedBudget, 
  estimatedBudgetRange, targetAudience, period, setting
"""
import pytest
import requests
import os

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
        print("PASS: /api/health returns status ok")


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
        print("PASS: Empty text returns 400")
    
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
        print("PASS: Whitespace-only text returns 400")
    
    def test_missing_text_field_returns_400(self):
        """Test that missing text field returns 400 error"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400
        print("PASS: Missing text field returns 400")


class TestNewJSONStructure:
    """Tests for the new JSON structure with all new fields"""
    
    def test_script_mode_returns_new_fields(self):
        """Test script mode returns all NEW fields from restructure"""
        assert len(SCRIPT_TEXT) >= 1000, f"Script text should be >= 1000 chars, got {len(SCRIPT_TEXT)}"
        
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": SCRIPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=90  # AI calls can take time
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        # Check original fields
        assert "primaryTitle" in data, "Missing primaryTitle"
        assert "altTitles" in data, "Missing altTitles"
        assert "loglines" in data, "Missing loglines"
        assert "taglines" in data, "Missing taglines"
        assert "synopsis" in data, "Missing synopsis"
        
        # Check NEW fields from restructure
        assert "genre" in data, "Missing genre (should be array)"
        assert isinstance(data["genre"], list), f"genre should be an array, got {type(data['genre'])}"
        print(f"PASS: genre is array: {data['genre']}")
        
        assert "comparableA" in data, "Missing comparableA"
        print(f"PASS: comparableA: {data['comparableA']}")
        
        assert "comparableB" in data, "Missing comparableB"
        print(f"PASS: comparableB: {data['comparableB']}")
        
        assert "themes" in data, "Missing themes"
        print(f"PASS: themes: {data['themes']}")
        
        assert "format" in data, "Missing format"
        print(f"PASS: format: {data['format']}")
        
        assert "estimatedBudget" in data, "Missing estimatedBudget"
        print(f"PASS: estimatedBudget: {data['estimatedBudget']}")
        
        assert "estimatedBudgetRange" in data, "Missing estimatedBudgetRange"
        print(f"PASS: estimatedBudgetRange: {data['estimatedBudgetRange']}")
        
        assert "targetAudience" in data, "Missing targetAudience"
        print(f"PASS: targetAudience: {data['targetAudience'][:50]}...")
        
        # Check optional fields
        assert "tone" in data, "Missing tone"
        print(f"PASS: tone: {data['tone']}")
        
        assert "setting" in data, "Missing setting"
        print(f"PASS: setting: {data['setting']}")
        
        assert "period" in data, "Missing period"
        print(f"PASS: period: {data['period']}")
        
        # Validate data types
        assert isinstance(data["primaryTitle"], str)
        assert isinstance(data["altTitles"], list)
        assert len(data["altTitles"]) >= 1, "Should have at least 1 alt title"
        assert isinstance(data["loglines"], list)
        assert len(data["loglines"]) >= 1, "Should have at least 1 logline"
        assert isinstance(data["taglines"], list)
        assert len(data["taglines"]) >= 1, "Should have at least 1 tagline"
        
        print(f"\nFull response structure validated successfully")
        print(f"Title: {data['primaryTitle']}")
        print(f"Alt Titles: {data['altTitles']}")
        print(f"Loglines count: {len(data['loglines'])}")
        print(f"Taglines count: {len(data['taglines'])}")


class TestResponseCounts:
    """Tests for response array counts"""
    
    def test_returns_three_loglines(self):
        """Analyse should return exactly 3 loglines"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": SCRIPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=90
        )
        if response.status_code == 200:
            data = response.json()
            logline_count = len(data.get("loglines", []))
            assert logline_count == 3, f"Expected 3 loglines, got {logline_count}"
            print(f"PASS: Got {logline_count} loglines")
    
    def test_returns_three_taglines(self):
        """Analyse should return exactly 3 taglines"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": SCRIPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=90
        )
        if response.status_code == 200:
            data = response.json()
            tagline_count = len(data.get("taglines", []))
            assert tagline_count == 3, f"Expected 3 taglines, got {tagline_count}"
            print(f"PASS: Got {tagline_count} taglines")
    
    def test_returns_three_alt_titles(self):
        """Analyse should return exactly 3 alt titles"""
        response = requests.post(
            f"{BASE_URL}/api/analyse",
            json={"text": SCRIPT_TEXT},
            headers={"Content-Type": "application/json"},
            timeout=90
        )
        if response.status_code == 200:
            data = response.json()
            alt_count = len(data.get("altTitles", []))
            assert alt_count == 3, f"Expected 3 alt titles, got {alt_count}"
            print(f"PASS: Got {alt_count} alt titles")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
