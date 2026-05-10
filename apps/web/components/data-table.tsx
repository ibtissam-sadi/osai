export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ borderBottom: '1px solid #3d3d3d', textAlign: 'left', padding: 8 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cidx) => (
              <td key={cidx} style={{ borderBottom: '1px solid #222', padding: 8 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
