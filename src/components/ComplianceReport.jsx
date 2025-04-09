import React from 'react';

const ComplianceReport = ({ findings }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold">Compliance Report</h2>
            <p>Regulatory Issues: {findings.regulatoryIssues.length > 0 ? findings.regulatoryIssues.join(', ') : 'None'}</p>
            <p>Disclaimer Requirements: {findings.disclaimerRequirements.join(', ')}</p>
            <p>Industry Standards: {findings.industryStandards}</p>
            <p>Improvement Suggestions: {findings.improvementSuggestions.join(', ')}</p>
        </div>
    );
};

export default ComplianceReport;
