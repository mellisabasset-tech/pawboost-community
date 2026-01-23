// Supabase Client Configuration
const SUPABASE_URL = 'https://mloxpnlejimshgbnqnqf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sb3hwbmxlamltc2hnYm5xbnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MjY3MTYsImV4cCI6MjA4NDMwMjcxNn0.kHYE-zHo-QUW96mA_Th_wEqEn_y7hmA4v_Vvhm16txs';

// Supabase REST API endpoint
async function saveToSupabase(table, data) {
  try {
    const payload = {
      ...data,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Saved to Supabase table: ${table}`, result);
      return { success: true, data: result };
    } else {
      const error = await response.json();
      console.error(`❌ Error saving to Supabase table: ${table}`, error);
      return { success: false, error };
    }
  } catch (error) {
    console.error(`❌ Network error saving to Supabase:`, error);
    return { success: false, error };
  }
}

// Supabase is our primary backend - no local fallback needed for GitHub Pages

// Save to Supabase only
async function saveFieldData(supabaseTable, data) {
  try {
    // Save to Supabase
    const supabaseResult = await saveToSupabase(supabaseTable, data);
    return supabaseResult;
  } catch (error) {
    console.error('❌ Error saving to Supabase:', error);
    return { success: false, error };
  }
}

// Debounce function to prevent too many requests
function debounce(func, delay = 500) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Save field in real-time (debounced to prevent spam)
function createFieldSaveHandler(supabaseTable, fieldId) {
  const element = document.getElementById(fieldId);
  if (!element) return;

  const debouncedSave = debounce(async () => {
    const value = element.value.trim();
    if (value) {
      const data = {
        [fieldId]: value,
        fieldName: fieldId
      };
      await saveFieldData(supabaseTable, data);
    }
  }, 500); // Wait 500ms after user stops typing

  element.addEventListener('blur', debouncedSave); // Save on blur (leave field)
  element.addEventListener('input', debouncedSave); // Save on input with debounce
}
