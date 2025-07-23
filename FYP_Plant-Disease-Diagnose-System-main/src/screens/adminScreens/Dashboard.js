import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const AdminDashboard = () => {
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
          fetch("http://127.0.0.1:5000/user/get_number_of_users"),
          fetch("http://127.0.0.1:5000/api/active-users"),
          fetch("http://127.0.0.1:5000/api/model/statistics"),
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
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B5D51" />
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>System Overview</Text>
      <View style={styles.row}>
        <DashboardCard title="Total Users" value={stats.total_users} />
        <DashboardCard title="Active Users" value={stats.active_users} />
      </View>

      <Text style={styles.sectionTitle}>Model Statistics</Text>
      {Object.entries(stats.model_statistics).map(([key, value]) => (
        <View style={styles.statRow} key={key}>
          <Text style={styles.statKey}>{formatKey(key)}</Text>
          <Text style={styles.statValue}>{String(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const formatKey = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const DashboardCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0B5D51",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B5D51",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statKey: {
    fontWeight: "bold",
    color: "#444",
  },
  statValue: {
    color: "#0B5D51",
  },
});

export default AdminDashboard;
