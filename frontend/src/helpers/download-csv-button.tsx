import { Button } from "@/components/ui/button";
import saveAs from "file-saver";
import { Download } from "lucide-react";

interface DownloadCSVButtonProps {
  data: any[];
  filename: string;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ data, filename }) => {
  const handleDownload = () => {
    if (data.length === 0) {
      alert("No data to download.");
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  };

  return (
    <Button onClick={handleDownload} className="bg-[#0073a6]">
      <Download className="mr-2 h-4 w-4" />
      Download CSV
    </Button>
  );
};

export default DownloadCSVButton;
