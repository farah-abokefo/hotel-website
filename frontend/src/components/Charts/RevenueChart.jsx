import React from 'react';

const RevenueChart = ({ data, title, height = 300 }) => {
  const defaultData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 16500 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 28000 },
    { month: 'Jul', revenue: 32000 },
    { month: 'Aug', revenue: 35000 },
    { month: 'Sep', revenue: 31000 },
    { month: 'Oct', revenue: 29000 },
    { month: 'Nov', revenue: 34000 },
    { month: 'Dec', revenue: 42000 }
  ];

  const chartData = data || defaultData;
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 0);
  
  const getBarHeight = (revenue) => {
    return (revenue / maxRevenue) * (height - 60);
  };

  // Inline styles for the component
  const styles = {
    chartContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    chartTitle: {
      margin: '0 0 20px 0',
      fontSize: '16px',
      color: '#333',
      fontWeight: '600'
    },
    chartWrapper: {
      position: 'relative',
      width: '100%',
      overflowX: 'auto'
    },
    chartBars: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      minWidth: '500px',
      height: `${height}px`
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%'
    },
    bar: {
      width: '60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px 8px 0 0',
      transition: 'all 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    barValue: {
      position: 'absolute',
      top: '-28px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '12px',
      color: '#666',
      whiteSpace: 'nowrap',
      fontWeight: '600'
    },
    barLabel: {
      marginTop: '12px',
      fontSize: '13px',
      color: '#666',
      textAlign: 'center',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.chartContainer}>
      {title && <h3 style={styles.chartTitle}>{title}</h3>}
      <div style={styles.chartWrapper}>
        <div style={styles.chartBars}>
          {chartData.map((item, index) => (
            <div key={index} style={styles.barWrapper}>
              <div 
                style={{
                  ...styles.bar,
                  height: `${getBarHeight(item.revenue)}px`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85';
                  e.currentTarget.style.transform = 'scaleX(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scaleX(1)';
                }}
              >
                <span style={styles.barValue}>
                  ${(item.revenue / 1000).toFixed(0)}k
                </span>
              </div>
              <div style={styles.barLabel}>{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;