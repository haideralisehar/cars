// API service for reports

const API_BASE_URL = 'https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net';

class ReportApiService {
  // Format date as MM-DD-YYYY as expected by the API
  formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  async getProfitLoss(dateRange) {
    const fromDate = this.formatDate(dateRange.from);
    const toDate = this.formatDate(dateRange.to);
    
    const url = `${API_BASE_URL}/api/reports/profit-loss?from=${fromDate}&to=${toDate}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any auth headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profit loss report:', error);
      throw error;
    }
  }

  // Helper function to format currency
  formatCurrency(amount) {
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} BHD`;
  }

  // Helper function to format percentage
  formatPercentage(value) {
    return `${value.toFixed(2)}%`;
  }

  // Transform monthly trend data for charts
  transformMonthlyTrend(monthlyTrend) {
    return monthlyTrend.map(item => ({
      name: `${item.month}/${item.year}`,
      revenue: item.revenue,
      month: item.month,
      year: item.year
    }));
  }

  // Transform category distribution for pie chart
  transformCategoryDistribution(categoryDistribution) {
    return categoryDistribution.map(item => ({
      name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      value: item.amount
    }));
  }

  // Format date for display
  formatDateForDisplay(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export const reportApi = new ReportApiService();