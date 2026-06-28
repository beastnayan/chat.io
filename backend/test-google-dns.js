import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.chat.ebkd2nh.mongodb.net",
  (err, addresses) => {
    console.log("Error:", err);
    console.log("Addresses:", addresses);
  }
);