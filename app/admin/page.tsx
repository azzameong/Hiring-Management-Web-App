"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/header/header";
import SearchBar from "./components/search-bar/search-bar";
import Menu from "./components/menu/menu";
import JobCard from "./components/job-card/job-card";
import { supabase } from "@/lib/supabaseClient";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  job_name: string;
  salary_min: number;
  salary_max: number;
  created_at: string;
}

const AdminPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
    // Check if user is admin
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin/login");
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error, status, statusText } = await supabase
        .from("jobs")
        .select("id, job_name, salary_min, salary_max, created_at") // HAPUS status
        .order("created_at", { ascending: false }); // Paling recent di atas

      console.log("Supabase response:", { data, error, status, statusText }); // Tambahkan ini

      if (error) {
        console.error("Error fetching jobs:", error, status, statusText);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function untuk refresh jobs setelah create job baru
  const refreshJobs = () => {
    console.log("Refreshing jobs..."); // Debug log
    fetchJobs();
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.mainContent}>
        {/* Kolom kiri - Tampilkan job cards */}
        <div className={styles.leftColumn}>
          <div className={styles.topBar}>
            <SearchBar />
          </div>

          <div className={styles.scrollArea}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                Loading jobs...
              </div>
            ) : jobs.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No jobs found. Create your first job!
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} style={{ marginBottom: '12px' }}>
                  <JobCard
                    jobTitle={job.job_name}
                    salaryMin={job.salary_min}
                    salaryMax={job.salary_max}
                    startedOn={new Date(job.created_at).toLocaleDateString('en-CA')}
                    // initialStatus={job.status} // HAPUS baris ini
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom kanan - Form untuk create job */}
        <div className={styles.rightColumn}>
          <Menu onJobCreated={refreshJobs} />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
