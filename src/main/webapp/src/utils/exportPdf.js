import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportToPdf(columns, rows, fileName = "report.pdf") {
  const doc = new jsPDF();
  doc.text("Report", 14, 14);
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20,
  });
  doc.save(fileName);
}