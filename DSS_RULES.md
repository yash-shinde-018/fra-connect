# Decision Support System (DSS) Rules

The FRA Atlas DSS uses rule-based logic to provide recommendations for forest rights implementation. This document describes the default rules and how to modify them.

## Default Rules

### 1. PM-KISAN Eligibility
- **Condition**: If household has farmland > 0.5 ha and farmer_flag = true
- **Action**: Mark PM-KISAN eligible
- **Priority**: High

### 2. Jal Jeevan Priority
- **Condition**: If water_index < 0.3 and population > 50
- **Action**: Recommend Jal Jeevan / borewell priority
- **Priority**: High

### 3. DAJGUA Interventions
- **Condition**: If forest_dependent = true and CFR_status = "granted"
- **Action**: Recommend specific DAJGUA interventions
- **Priority**: High

## How to Edit Rules

1. Navigate to the DSS page in the application
2. Click on the "Rule Editor" tab
3. Toggle rules on/off using the checkboxes
4. Click "Add New Rule" to create custom rules
5. Fill in the rule name, description, condition, and action
6. Click "Add Rule" to save

## Rule Syntax

Rules use a simple condition-action syntax:

**Conditions** can include:
- Numeric comparisons: `area > 0.5`, `population < 100`
- String comparisons: `status = "granted"`, `type != "individual"`
- Boolean checks: `farmer_flag = true`

**Actions** specify what recommendation to make when the condition is met.

## Example Custom Rules

### Forest Conservation Incentive
- **Condition**: If forest_area > 10 ha and community_managed = true
- **Action**: Recommend Forest Conservation Payment Scheme
- **Priority**: Medium

### Watershed Development
- **Condition**: If slope > 15% and rainfall < 800mm
- **Action**: Recommend Watershed Development Program
- **Priority**: Medium

## Best Practices

1. **Keep conditions simple**: Complex conditions may be difficult to evaluate
2. **Set appropriate priorities**: High priority rules will be highlighted in reports
3. **Test rules**: Always test new rules with sample data
4. **Document rules**: Add clear descriptions for future reference

## Rule Evaluation

Rules are evaluated in the order they appear in the list. The system:
1. Checks each rule against the patta data
2. Collects all matching recommendations
3. Sorts recommendations by priority
4. Displays results with confidence scores

## Confidence Scoring

Each recommendation includes a confidence score (0-100%) based on:
- Data completeness (30%)
- Rule match quality (50%)
- Historical accuracy (20%)