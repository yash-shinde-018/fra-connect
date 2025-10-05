# FRA Atlas DSS Rules Summary

## Overview

The Decision Support System (DSS) in the FRA Atlas uses rule-based logic to provide recommendations for forest rights implementation. This document summarizes the default rules included in the system and explains how to modify them through the UI.

## Default Rules

### 1. PM-KISAN Eligibility
- **Rule Name**: PM-KISAN Eligibility
- **Description**: Identifies households eligible for the PM-KISAN scheme
- **Condition**: `farmland > 0.5 ha AND farmer_flag = true`
- **Action**: Mark PM-KISAN eligible
- **Priority**: High

### 2. Jal Jeevan Priority
- **Rule Name**: Jal Jeevan Priority
- **Description**: Recommends water infrastructure for villages with water scarcity
- **Condition**: `water_index < 0.3 AND population > 50`
- **Action**: Recommend Jal Jeevan / borewell priority
- **Priority**: High

### 3. DAJGUA Interventions
- **Rule Name**: DAJGUA Interventions
- **Description**: Recommends specific interventions for forest-dependent communities
- **Condition**: `forest_dependent = true AND CFR_status = "granted"`
- **Action**: Recommend specific DAJGUA interventions
- **Priority**: High

## How to Edit Rules in the UI

1. **Navigate to the DSS Page**
   - Click on "DSS" in the main navigation menu
   - The DSS dashboard will load with two tabs: "Rule Editor" and "Analysis Results"

2. **Access the Rule Editor**
   - Click on the "Rule Editor" tab
   - You'll see a list of all active rules with their details

3. **Modify Existing Rules**
   - Toggle rules on/off using the checkboxes next to each rule
   - Active rules will be evaluated when running the DSS analysis
   - Inactive rules will be ignored

4. **Add New Rules**
   - Scroll to the bottom of the rule list
   - Click the "Add New Rule" button
   - Fill in the following fields:
     - **Rule Name**: A descriptive name for the rule
     - **Description**: Detailed explanation of what the rule does
     - **Condition**: The logical condition that triggers the rule
     - **Action**: The recommendation to make when the condition is met
   - Click "Add Rule" to save your new rule

5. **Run DSS Analysis**
   - After modifying rules, click "Run DSS Analysis"
   - The system will evaluate all active rules against the current dataset
   - Results will appear in the "Analysis Results" tab

## Rule Syntax Guide

### Conditions
Conditions use a simple syntax with the following operators:
- **Comparison Operators**: `=`, `!=`, `>`, `<`, `>=`, `<=`
- **Logical Operators**: `AND`, `OR`
- **Value Types**: 
  - Numbers: `5`, `0.5`, `100`
  - Strings: `"granted"`, `"individual"`
  - Booleans: `true`, `false`

### Examples of Valid Conditions
- `area > 0.5`
- `status = "granted" AND population > 100`
- `forest_dependent = true OR water_index < 0.3`
- `crop_type = "rice" AND irrigation = "borewell"`

### Actions
Actions specify what recommendation to make when a condition is met:
- Should be descriptive and actionable
- Include specific scheme names when applicable
- Indicate priority level (High, Medium, Low)

## Example Custom Rules

### Forest Conservation Incentive
- **Condition**: `forest_area > 10 ha AND community_managed = true`
- **Action**: Recommend Forest Conservation Payment Scheme
- **Priority**: Medium

### Watershed Development
- **Condition**: `slope > 15% AND rainfall < 800mm`
- **Action**: Recommend Watershed Development Program
- **Priority**: Medium

### Homestead Land Rights
- **Condition**: `holder_type = "individual" AND homestead_area < 0.05 ha`
- **Action**: Recommend Homestead Land Rights Verification
- **Priority**: Medium

## Best Practices for Rule Creation

1. **Keep Conditions Simple**: Complex nested logic may be difficult to evaluate
2. **Use Descriptive Names**: Make rule names and descriptions clear and specific
3. **Set Appropriate Priorities**: High priority rules will be highlighted in reports
4. **Test New Rules**: Always run the DSS after adding new rules to verify behavior
5. **Document Logic**: Include clear explanations of the rationale behind each rule
6. **Avoid Conflicts**: Check that new rules don't contradict existing ones
7. **Consider Edge Cases**: Think about how rules apply to boundary conditions

## Rule Evaluation Process

The DSS evaluates rules in the following sequence:
1. **Data Collection**: Gather all relevant data for the selected patta/village
2. **Rule Matching**: Check each active rule against the collected data
3. **Recommendation Generation**: Create recommendations for matched rules
4. **Confidence Scoring**: Calculate confidence levels for each recommendation
5. **Result Presentation**: Display results sorted by priority and confidence

## Confidence Scoring Factors

Each recommendation includes a confidence score (0-100%) based on:
- **Data Completeness** (30%): Availability of required data fields
- **Rule Match Quality** (50%): How well the data matches the rule conditions
- **Historical Accuracy** (20%): Past performance of similar recommendations

## Troubleshooting Common Issues

### Rule Not Triggering
- Verify all required data fields are populated
- Check condition syntax for typos
- Ensure the rule is marked as active

### Unexpected Recommendations
- Review rule conditions for logical errors
- Check for conflicting rules
- Verify data values in the source dataset

### Performance Issues
- Simplify complex conditions
- Limit the number of active rules
- Consider breaking complex rules into multiple simpler ones

## Conclusion

The DSS rule editor provides a flexible way to customize the decision support system for specific needs. By following these guidelines, administrators can create and modify rules to generate meaningful recommendations for forest rights implementation.