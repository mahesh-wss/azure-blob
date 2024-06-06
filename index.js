require("dotenv").config();
const { DefaultAzureCredential } = require("@azure/identity");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const account = process.env.ACCOUNT || "";
const accountKey = process.env.ACCOUNTKEY || "";

// const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
// const blobServiceClient = new BlobServiceClient(
//   `https://${account}.blob.core.windows.net`,
//   sharedKeyCredential
// );

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

const containerName = process.env.CONTAINER || "";

async function main() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = "Hello world!";
  const blobName = "Mahesh/newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobUrl = blockBlobClient.url;
  console.log("Blob URL:", blobUrl);
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  );
  // console.log(JSON.stringify(uploadBlobResponse));
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

main();
