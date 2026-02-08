import xlsx from 'xlsx';

export class ExcelReader {
    static read(filePath: string, sheetName: string): any[] {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        return xlsx.utils.sheet_to_json(sheet);
    }
}
