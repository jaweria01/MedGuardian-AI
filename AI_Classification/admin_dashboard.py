import streamlit as st
import re
import pandas as pd
import ast
import math

# Load and parse classified_reports.txt
def load_classified_reports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    reports = content.split('--------------------------------------------------')
    parsed_reports = []

    for report in reports:
        if report.strip():
            match_report = re.search(r'Report \d+: (.+?)\n', report)
            match_classification = re.search(r'Classification:\s*({[\s\S]+?})', report)

            if match_report and match_classification:
                parsed_reports.append({
                    'Report': match_report.group(1).strip(),
                    'Classification': match_classification.group(1).replace('\n', '').replace(' ', '')
                })
    return parsed_reports

# Safe JSON parsing
def safe_parse_json(x):
    try:
        return pd.Series(ast.literal_eval(x.strip()))
    except:
        return pd.Series({"IssueType": "Unknown", "Seriousness": "Unknown"})

# Color badge for seriousness
def seriousness_badge(level):
    color_map = {
        "Critical": "red",
        "Medium": "orange",
        "Low": "green",
        "Unknown": "gray"
    }
    color = color_map.get(level, "gray")
    return f'<span style="color: white; background-color: {color}; padding: 3px 8px; border-radius: 10px;">{level}</span>'

# Icon for issue type
def issue_type_icon(issue_type):
    icon_map = {
        "Medical Emergency": "🩺",
        "Safety Hazard": "⚠️",
        "Maintenance Issue": "🧹",
        "Minor Issue": "💬",
        "Escalated Issue": "🚨",
        "Unknown": "❓"
    }
    return f"{icon_map.get(issue_type, '❓')} {issue_type}"

# Load data
reports = load_classified_reports('classified_reports.txt')
df = pd.DataFrame(reports)
df[['IssueType', 'Seriousness']] = df['Classification'].apply(safe_parse_json)

# UI
st.title("🏥 MedGuardian AI - Admin Dashboard")
st.subheader("View and Monitor Hospital Incident Reports")

# Filters & Search
with st.expander("🧰 Filters & Search", expanded=True):
    col1, col2 = st.columns(2)

    with col1:
        classification_filter = st.selectbox(
            "🔍 Filter by Issue Type",
            ["All"] + sorted(df['IssueType'].unique())
        )
    with col2:
        seriousness_filter = st.selectbox(
            "⚠️ Filter by Seriousness Level",
            ["All"] + sorted(df['Seriousness'].unique())
        )

    search_query = st.text_input("🔎 Search Reports by Keyword")

    if st.button("🔄 Reset Filters"):
        st.rerun()

# Apply filters
filtered_df = df.copy()
if classification_filter != "All":
    filtered_df = filtered_df[filtered_df["IssueType"] == classification_filter]
if seriousness_filter != "All":
    filtered_df = filtered_df[filtered_df["Seriousness"] == seriousness_filter]
if search_query:
    filtered_df = filtered_df[filtered_df['Report'].str.lower().str.contains(search_query.lower())]

# Pagination
items_per_page = 5
total_pages = max(1, math.ceil(len(filtered_df) / items_per_page))
page = st.number_input("📄 Page", min_value=1, max_value=total_pages, step=1)

start_idx = (page - 1) * items_per_page
end_idx = start_idx + items_per_page
page_df = filtered_df.iloc[start_idx:end_idx]

# Display results
st.markdown(f"### 📋 Showing {len(filtered_df)} result(s) (Page {page} of {total_pages})")
for idx, row in page_df.iterrows():
    st.markdown(f"### Report {idx + 1}")
    st.markdown(f"**Incident:** {row['Report']}")
    st.markdown(f"**Issue Type:** {issue_type_icon(row['IssueType'])}")
    st.markdown(f"**Seriousness:** {seriousness_badge(row['Seriousness'])}", unsafe_allow_html=True)
    st.markdown("---")

# CSV download
st.download_button(
    label="📥 Download Filtered Reports as CSV",
    data=filtered_df.to_csv(index=False).encode('utf-8'),
    file_name="filtered_classified_reports.csv",
    mime='text/csv'
)




