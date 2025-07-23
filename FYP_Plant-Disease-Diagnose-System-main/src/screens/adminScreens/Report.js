import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    model_statistics: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, activeRes, statsRes] = await Promise.all([
          fetch('http://127.0.0.1:5000/user/get_number_of_users'),
          fetch('http://127.0.0.1:5000/api/active-users'),
          fetch('http://127.0.0.1:5000/api/model/statistics'),
        ]);

        const userData = await userRes.json();
        const activeData = await activeRes.json();
        const statsData = await statsRes.json();

        setStats({
          total_users: userData.total_users || 0,
          active_users: activeData.active_user_count || 0,
          model_statistics: statsData || {},
        });
      } catch (err) {
        console.error('Failed to fetch report data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart Data
  const accuracyLabels = Array.from({ length: 50 }, (_, i) => `E${i + 1}`);
  const accuracyData = Array.from({ length: 50 }, (_, i) =>
    Math.min(70 + i * 0.6 + Math.random() * 2, 99).toFixed(2)
  );
  const dataSizeLabels = Array.from({ length: 10 }, (_, i) => `Batch ${i + 1}`);
  const dataSize = Array.from({ length: 10 }, () => Math.floor(100 + Math.random() * 100));
  const lastRetrained = '2025-06-01';
  const nextRetraining = '2025-06-20';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B5D51" />
        <Text>Loading Report...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>System Report</Text>

      <Text style={styles.sectionTitle}>User Statistics</Text>
      <View style={styles.row}>
        <Card title="Total Users" value={stats.total_users} />
        <Card title="Active Users" value={stats.active_users} />
      </View>

      <Text style={styles.sectionTitle}>Model Statistics</Text>
      {Object.entries(stats.model_statistics).map(([key, value]) => (
        <View style={styles.statRow} key={key}>
          <Text style={styles.statKey}>{formatKey(key)}</Text>
          <Text style={styles.statValue}>{String(value)}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Model Accuracy</Text>
      <View style={styles.card}>
        <LineChart
          data={{
            labels: accuracyLabels.filter((_, i) => i % 5 === 0),
            datasets: [{ data: accuracyData.map(Number) }],
          }}
          width={screenWidth - 32}
          height={250}
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      <Text style={styles.sectionTitle}>Training Data Size</Text>
      <View style={styles.card}>
        <BarChart
          data={{
            labels: dataSizeLabels,
            datasets: [{ data: dataSize }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Last Retrained</Text>
        <Text style={styles.value}>{lastRetrained}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Next Retraining Scheduled</Text>
        <Text style={styles.value}>{nextRetraining}</Text>
      </View>
    </ScrollView>
  );
};

const formatKey = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const Card = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const chartConfig = {
  backgroundColor: '#f9f9f9',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#f4f4f4',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(11, 93, 81, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statKey: {
    fontWeight: 'bold',
    color: '#444',
  },
  statValue: {
    color: '#0B5D51',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B5D51',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default Report;
