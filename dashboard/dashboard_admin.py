import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.express as px
import requests


# Base API URL
API_URL = "https://9474-154-81-244-121.ngrok-free.app/all-reports"

# Initialize app
app = dash.Dash(__name__)
app.title = "Hospital Management Dashboard"




def fetch_data():
    try:
        response = requests.get(API_URL)
        if response.status_code == 200:
            data = response.json()  
            df = pd.DataFrame(data)  # 

            
            if 'date_reported' in df.columns:
                df['date_reported'] = pd.to_datetime(df['date_reported'])
        

            return df
        
        else:
            print("Error fetching data:", response.status_code)
            return pd.DataFrame()
    except Exception as e:
        print("Exception occurred:", e)
        return pd.DataFrame()
    
    
    


# Layout
app.layout = html.Div([
    html.Div([
        html.H1("Hospital Management Dashboard", style={'textAlign': 'center', 'color': '#003366', 'fontSize': 40}),
    ], style={'padding': '20px', 'backgroundColor': '#E0F7FA', 'marginBottom': '20px'}),

    html.Div([
        html.Label("Select Issue Type:", style={'fontSize': 20}),
        dcc.Dropdown(
            id='issue-type-dropdown',
            options=[
                {'label': 'Minor Issue', 'value': 'minor'},
                {'label': 'Medical Emergency', 'value': 'medical'},
                {'label': 'Safety Hazard', 'value': 'safety'},
                {'label': 'Maintenance Issue', 'value': 'maintenance'},
                {'label': 'Escalated Issue', 'value': 'escalated'}
            ],
            value='minor',
            style={'fontSize': 18}
        ),
    ], style={'width': '40%', 'margin': 'auto', 'marginBottom': '30px'}),

    html.Div([
        html.Div(id='status-counts', style={
            'fontSize': 24, 
            'padding': '20px',
            'backgroundColor': '#F1F8E9',
            'borderRadius': '10px',
            'boxShadow': '2px 2px 10px lightgrey',
            'textAlign': 'center'
        }),

        dcc.Graph(id='status-pie-chart', style={'marginTop': '30px'}),

        html.Div([
            html.H2("Today's Report", style={'textAlign': 'center', 'color': '#00695C'}),
            html.Div(id='daily-report', style={
                'fontSize': 20, 
                'padding': '20px',
                'backgroundColor': '#FFECB3',
                'borderRadius': '10px',
                'boxShadow': '2px 2px 10px lightgrey',
                'textAlign': 'center'
            })
        ], style={'marginTop': '50px'})
    ], style={'width': '80%', 'margin': 'auto'})
])

# Callback
@app.callback(
    [Output('status-counts', 'children'),
     Output('status-pie-chart', 'figure'),
     Output('daily-report', 'children')],
    [Input('issue-type-dropdown', 'value')]
)
def update_dashboard(selected_issue):
    df = fetch_data()
    
    if df.empty or 'issue_type' not in df.columns or 'status' not in df.columns:
        return "No data available", px.pie(title="No data to show"), "No daily data"

    filtered_df = df[df['issue_type'] == selected_issue]

    # Status counts
    status_counts = filtered_df['status'].value_counts().to_dict()
    open_count = status_counts.get('open', 0)
    resolved_count = status_counts.get('resolved', 0)
    escalated_count = status_counts.get('escalated', 0)

    status_text = f"Open: {open_count} | Resolved: {resolved_count} | Escalated: {escalated_count}"

    # Pie Chart
    pie_fig = px.pie(
        names=['Open', 'Resolved', 'Escalated'],
        values=[open_count, resolved_count, escalated_count],
        title=f'Status Distribution for {selected_issue.capitalize()} Issues',
        color_discrete_sequence=px.colors.qualitative.Set3
    )
    pie_fig.update_traces(textposition='inside', textinfo='percent+label')

    # Daily Report
    today = pd.Timestamp.today().normalize()
    today_df = df[df['date_reported'] == today]

    if today_df.empty:
        daily_text = "No issues reported today."
    else:
        daily_counts = today_df['issue_type'].value_counts().to_dict()
        report_lines = [f"{key.capitalize()} Issues: {value}" for key, value in daily_counts.items()]
        daily_text = " | ".join(report_lines)

    return status_text, pie_fig, daily_text

# Run app
if __name__ == '__main__':
     
    app.run(debug=True)
