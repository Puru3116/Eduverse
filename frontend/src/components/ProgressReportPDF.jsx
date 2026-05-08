import React from 'react';
import { BookOpen, Clock, Target, CheckCircle2, XCircle } from 'lucide-react';

const ProgressReportPDF = ({ student, progressData = [], attendanceData = [] }) => {
  // Aggregate Progress Data
  const safeProgress = Array.isArray(progressData) ? progressData : [];
  const safeAttendance = Array.isArray(attendanceData) ? attendanceData : [];

  const totalGamesPlayed = safeProgress.length;
  const totalTimeSpent = safeProgress.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0); // in seconds
  const avgScore = totalGamesPlayed > 0 
    ? (safeProgress.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalGamesPlayed).toFixed(1) 
    : 0;

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Aggregate Attendance Data
  const totalDays = safeAttendance.length;
  const presentDays = safeAttendance.filter(a => a.status === 'present').length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Group progress by module
  const progressByModule = safeProgress.reduce((acc, curr) => {
    if (!acc[curr.moduleName]) acc[curr.moduleName] = [];
    acc[curr.moduleName].push(curr);
    return acc;
  }, {});

  const joinDate = safeAttendance.length > 0 
    ? new Date(safeAttendance[0].date).toLocaleDateString() 
    : new Date().toLocaleDateString();

  return (
    <div id="progress-report-content" style={{ 
      padding: '48px', 
      fontFamily: 'sans-serif', 
      width: '800px', 
      margin: '0 auto', 
      position: 'relative', 
      overflow: 'hidden',
      minHeight: '1122px', 
      backgroundColor: '#ffffff', 
      color: '#1e293b' 
    }}>
      
      {/* Decorative Background Graphics */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '256px', height: '256px', borderRadius: '9999px', filter: 'blur(64px)', marginRight: '-80px', marginTop: '-80px', opacity: 0.5, backgroundColor: '#e0e7ff' }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '384px', height: '384px', borderRadius: '9999px', filter: 'blur(64px)', marginLeft: '-80px', marginBottom: '-80px', opacity: 0.5, backgroundColor: '#eff6ff' }}></div>
 
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header Section */}
        <div style={{ borderBottom: '4px solid #6366f1', paddingBottom: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '36px', padding: '12px', borderRadius: '16px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', backgroundColor: '#e0e7ff' }}>🌍</span>
              <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.025em', margin: 0, color: '#4338ca' }}>EduVerse</h1>
            </div>
            <h2 style={{ fontSize: '30px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.025em', margin: 0, color: '#1e293b' }}>Student Progress Report</h2>
            <p style={{ fontWeight: '700', marginTop: '8px', margin: 0, color: '#64748b' }}>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
          <div style={{ textAlign: 'right', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', backgroundColor: '#f8fafc' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: 0, color: '#4338ca' }}>{student?.firstName} {student?.lastName}</h3>
            <p style={{ fontWeight: '700', margin: 0, color: '#64748b' }}>Class: {student?.classGrade || 'N/A'}</p>
            <p style={{ fontSize: '14px', marginTop: '4px', margin: 0, color: '#64748b' }}>Joined: {joinDate}</p>
          </div>
        </div>
 
        {/* Summary Dashboard */}
        <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '16px', borderLeft: '4px solid #10b981', paddingLeft: '12px', color: '#1e293b' }}>Learning Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid #e0f2fe', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#f0f9ff' }}>
            <BookOpen size={28} style={{ color: '#6366f1', marginBottom: '8px' }} />
            <span style={{ fontSize: '30px', fontWeight: '900', color: '#4338ca' }}>{totalGamesPlayed}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px', color: '#64748b' }}>Modules Completed</span>
          </div>
          <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid #d1fae5', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#ecfdf5' }}>
            <Target size={28} style={{ color: '#10b981', marginBottom: '8px' }} />
            <span style={{ fontSize: '30px', fontWeight: '900', color: '#047857' }}>{avgScore}%</span>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px', color: '#64748b' }}>Average Score</span>
          </div>
          <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid #fef3c7', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#fffbeb' }}>
            <Clock size={28} style={{ color: '#f59e0b', marginBottom: '8px' }} />
            <span style={{ fontSize: '30px', fontWeight: '900', color: '#b45309' }}>{formatTime(totalTimeSpent)}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px', color: '#64748b' }}>Time Learned</span>
          </div>
          <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid #f3e8ff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#faf5ff' }}>
            <CheckCircle2 size={28} style={{ color: '#a855f7', marginBottom: '8px' }} />
            <span style={{ fontSize: '30px', fontWeight: '900', color: '#7e22ce' }}>{attendancePercentage}%</span>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px', color: '#64748b' }}>Attendance Rate</span>
          </div>
        </div>
 
        {/* Detailed Progress Section */}
        <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '16px', borderLeft: '4px solid #6366f1', paddingLeft: '12px', color: '#1e293b' }}>Module Mastery Details</h3>
        {Object.keys(progressByModule).length === 0 ? (
          <div style={{ padding: '24px', borderRadius: '16px', textAlign: 'center', fontWeight: '700', border: '1px solid #f1f5f9', marginBottom: '40px', backgroundColor: '#f8fafc', color: '#64748b' }}>
            No learning data recorded yet. Time to start the adventure!
          </div>
        ) : (
          <div style={{ marginBottom: '40px' }}>
            {Object.entries(progressByModule).map(([moduleName, records]) => (
              <div key={moduleName} style={{ marginBottom: '24px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
                <div style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f1f5f9' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '0.025em', margin: 0, color: '#1e293b' }}>{moduleName.toUpperCase()}</h4>
                </div>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                      <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', width: '33.33%', color: '#64748b' }}>Topic/Game</th>
                      <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', color: '#64748b' }}>Level</th>
                      <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', color: '#64748b' }}>Score</th>
                      <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right', color: '#64748b' }}>Time Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '700', textTransform: 'capitalize', color: '#334155' }}>{record.gameId.replace(/-/g, ' ')}</td>
                        <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '700', textAlign: 'center', color: '#475569' }}>{record.levelNumber}</td>
                        <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                          <span style={{ 
                            padding: '4px 12px', 
                            borderRadius: '9999px', 
                            fontSize: '12px', 
                            fontWeight: '900',
                            backgroundColor: record.score >= 80 ? '#d1fae5' : record.score >= 50 ? '#fef3c7' : '#fee2e2',
                            color: record.score >= 80 ? '#065f46' : record.score >= 50 ? '#92400e' : '#991b1b'
                          }}>
                            {record.score}%
                          </span>
                        </td>
                        <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '700', textAlign: 'right', color: '#64748b' }}>{formatTime(record.timeSpent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
 
        {/* Attendance Log Section */}
        <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '16px', borderLeft: '4px solid #f59e0b', paddingLeft: '12px', color: '#1e293b' }}>Recent Attendance Log</h3>
        {attendanceData.length === 0 ? (
          <div style={{ padding: '24px', borderRadius: '16px', textAlign: 'center', fontWeight: '700', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', color: '#64748b' }}>
            No attendance records found.
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
             <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
               <thead>
                 <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f1f5f9' }}>
                   <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>Date</th>
                   <th style={{ padding: '12px 24px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right', color: '#64748b' }}>Status</th>
                 </tr>
               </thead>
               <tbody>
                 {attendanceData.slice(-10).reverse().map((record, idx) => (
                   <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                     <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                       {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                     </td>
                     <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                        {record.status === 'present' ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '14px', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #d1fae5', backgroundColor: '#ecfdf5', color: '#059669' }}>
                            <CheckCircle2 size={14} /> Present
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '14px', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#dc2626' }}>
                            <XCircle size={14} /> Absent
                          </span>
                        )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {attendanceData.length > 10 && (
               <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: '700', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc', color: '#94a3b8' }}>
                 Showing 10 most recent records. Total days tracked: {attendanceData.length}.
               </div>
             )}
          </div>
        )}
 
        {/* Footer */}
        <div style={{ marginTop: '64px', paddingTop: '24px', textAlign: 'center', borderTop: '2px solid #f1f5f9' }}>
          <p style={{ fontWeight: '700', fontSize: '14px', color: '#94a3b8', margin: 0 }}>Keep up the great work! Consistent learning leads to mastery.</p>
          <p style={{ fontWeight: '700', fontSize: '12px', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#cbd5e1', margin: 0 }}>EduVerse • Official Progress Report</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReportPDF;
