import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AdminStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    agents: 0,
    pending: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [usersRes, agentsRes, complaintsRes] = await Promise.all([
        axios.get("http://localhost:8000/stats/total-users"),
        axios.get("http://localhost:8000/stats/total-agents"),
        axios.get("http://localhost:8000/stats/complaints"),
      ]);

      setStats({
        users: usersRes.data.count,
        agents: agentsRes.data.count,
        pending: complaintsRes.data.pending,
        resolved: complaintsRes.data.resolved,
      });
    };

    fetchStats();
  }, []);

  return (
    <Row className="mb-4">
      {[
        { title: "👥 Total Users", value: stats.users },
        { title: "📬 Active Agents", value: stats.agents },
        { title: "🎯 Pending Complaints", value: stats.pending },
        { title: "✅ Resolved Complaints", value: stats.resolved },
      ].map((stat, i) => (
        <Col key={i} md={3}>
          <Card bg="dark" text="light" className="shadow text-center">
            <Card.Body>
              <Card.Title>{stat.title}</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                {stat.value}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdminStats;
