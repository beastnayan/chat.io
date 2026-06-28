import dns from "dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.chat.ebkd2nh.mongodb.net"
  );

  console.log("SUCCESS:");
  console.log(result);
} catch (error) {
  console.log("ERROR:");
  console.log(error);
}