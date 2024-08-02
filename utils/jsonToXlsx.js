const xlsx = require("xlsx");
const fs = require("fs");

exports.jsonToXlsx = (jsonData, header, filename, fileLocation) => {
  // Convert JSON data to a worksheet 
  const worksheet = xlsx.utils.json_to_sheet(jsonData, { header:header });

  // Create a new workbook
  const workbook = xlsx.utils.book_new();
  // Append the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a buffer
  const xlsxBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

  try {
     fs.writeFileSync(
      `${fileLocation}/${filename}.xlsx`,
      xlsxBuffer
    );
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
