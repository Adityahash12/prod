import React from 'react';

const MarketingInsights = ({ insights }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold">Marketing Insights</h2>
            <p>Audience Segments: {insights.audienceSegments.join(', ')}</p>
            <p>Top Keywords: {insights.topKeywords.join(', ')}</p>
            <p>Sentiment Score: {insights.sentimentScore}</p>
            <p>Competitor Comparison: {insights.competitorComparison}</p>
        </div>
    );
};

export default MarketingInsights;
