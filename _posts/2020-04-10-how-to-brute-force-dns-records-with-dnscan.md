---
layout: post
title: How to brute-force DNS records with dnscan
subtitle: A brief introduction to subdomain listing techniques
excerpt: Enumeration is an important part of pentesting. Mapping out your target’s infrastructure is crucial to finding points of entry into their network, and enumerating their DNS records by brute-force guessing common subdomains can often yield juicy results.
tags: [beginner, introduction, enumeration, pentesting, DNS]
comments: true
readtime: true
---

## Introduction:

Enumeration is an important part of pentesting. Mapping out your target's infrastructure is crucial to finding points of entry into their network, and enumerating their DNS records by brute-force guessing common subdomains can often yield juicy results. 

In this post we will be deep diving into *dnscan*, a python wordlist-based DNS subdomain scanner that will allow us to map out a target's DNS topology. You can download the tool from the following GitHub repository: [github.com/rbsec/dnscan](https://github.com/rbsec/dnscan)

## How it works:

*dnscan* uses several techniques to try and list all DNS records associated with a certain domain:

It first tries to perform a [DNS zone transfer](https://en.wikipedia.org/wiki/DNS_zone_transfer) attack on each of the target domain's nameservers. A DNS zone transfer is a type of DNS transaction where a nameserver passes a copy of part of its database (called a "zone") to another DNS server. This mechanism uses a master/slave architecture. In a DNS zone transfer attack we take advantage of that by pretending to be a slave and asking the master for a copy of the zone records, which contain useful information about the target's infrastructure.

If this fails, *dnscan* looks up TXT, MX, DMARC and other records for the domain, and then goes on to try and brute-force the A or AAAA records (depending on the mode selected). Included with the script are a set of wordlists that contain common subdomains. It uses these lists to run through each subdomain, and prints out those that it is able to resolve, along with their IP addresses.

## Installation:

This installation will be done using a Linux-based OS. Prerequisites are having installed git, python, and pip.

We need to run the following commands in a terminal:

   1. Cloning the repository:

~~~
git clone https://github.com/rbsec/dnscan.git
~~~

   2. Installing dependencies:

~~~
cd dnscan && pip install -r requirements.txt
~~~

<hr class="post">

## Use:

Depending on what OS you use, you may need to look up how to run a python script. If you use a Linux-based distribution, you can run it by typing `./dnscan.py` into a terminal (you should make sure the file is [executable](https://askubuntu.com/questions/229589/how-to-make-a-file-e-g-a-sh-script-executable-so-it-can-be-run-from-a-termi)).

If we use the `-h` parameter, it will display a help menu like the one below, listing all available parameters, as well as instructions on how to use the script.

<pre>
enrique@host:~/dnscan$ ./dnscan.py -h
usage: dnscan.py [-h] (-d DOMAIN | -l DOMAIN_LIST) [-w WORDLIST] [-t THREADS]
                 [-6] [-z] [-r] [-R RESOLVER] [-T] [-o OUTPUT_FILENAME]
                 [-i OUTPUT_IPS] [-D] [-v] [-n]

optional arguments:
  -h, --help                            show this help message and exit
  -d DOMAIN, --domain DOMAIN            Target domain
  -l DOMAIN_LIST, --list DOMAIN_LIST    File containing list of target domains
  -w WORDLIST, --wordlist WORDLIST      Wordlist
  -t THREADS, --threads THREADS         Number of threads
  -6, --ipv6                            Scan for AAAA records
  -z, --zonetransfer                    Only perform zone transfers
  -r, --recursive                       Recursively scan subdomains
  -R RESOLVER, --resolver RESOLVER      Use the specified resolver instead of
                                        the system default
  -T, --tld                             Scan for TLDs
  -o OUTPUT_FILENAME, --output OUTPUT_FILENAME
                                        Write output to a file
  -i OUTPUT_IPS, --output-ips OUTPUT_IPS
                                        Write discovered IP addresses to a
                                        file
  -D, --domain-first                    Output domain first, rather than IP
                                        address
  -v, --verbose                         Verbose mode
  -n, --nocheck                         Don't check nameservers before
                                        scanning
</pre>


 As an example, we will try to run the following command:

~~~
./dnscan.py -d twitter.com -w subdomains-10000.txt -t 10 -R 1.0.0.1
~~~

With `-d` we set the domain we want to target, `-w` sets the wordlist we want to use, `-t` sets the number of threads we want to run, and `-R` sets a custom resolver, the DNS server we use to figure out if certain subdomains exist or not. The only mandatory arguments are `-d` or `-l`. The output of this command is as shown below (It's been cut off for brevity):


<pre>
enrique@host:~/dnscan$ ./dnscan.py -d twitter.com -w subdomains-10000.txt -t 10 -R 1.0.0.1
[*] Processing domain twitter.com
[*] Using specified resolver 1.0.0.1
[+] Getting nameservers
208.78.70.34 - ns1.p34.dynect.net
205.251.192.179 - a.r06.twtrdns.net
208.78.71.34 - ns3.p34.dynect.net
204.13.250.34 - d01-02.ns.twtrdns.net
205.251.199.195 - d.r06.twtrdns.net
205.251.194.151 - c.r06.twtrdns.net
208.78.70.34 - d01-01.ns.twtrdns.net
204.13.251.34 - ns4.p34.dynect.net
204.13.250.34 - ns2.p34.dynect.net
205.251.196.198 - b.r06.twtrdns.net
[-] Zone transfer failed

[+] TXT records found
"google-site-verification=TNhAkfLUeIbzzzSgPNxS5aEkKMf3aUcpPmCK1_kmIvU"
"v=spf1 ip4:199.16.156.0/22 ip4:199.59.148.0/22 ip4:8.25.194.0/23 ip4:8.25.196.0/23 ip4:204.92.114.203 ip4:204.92.114.204/31 ip4:54.156.255.69 include:_spf.google.com include:_thirdparty.twitter.com -all"
"adobe-idp-site-verification=a2ff8fc40c434d1d6f02f68b0b1a683e400572ab8c1f2c180c71c3d985b9270a"
"MS=BEE202D20C326867290BDEFA2DDDF4594B5D6860"
"google-site-verification=h6dJIv0HXjLOkGAotLAWEzvoi9SxqP4vjpx98vrCvvQ"
"traction-guest=6882b04e-4188-4ff9-8bb4-bff5a3d358e6"

[+] DMARC records found
"v=DMARC1; p=reject; rua=mailto:d@rua.agari.com; ruf=mailto:d@ruf.agari.com; fo=1"

[+] MX records found, added to target list
20 alt1.aspmx.l.google.com.
10 aspmx.l.google.com.
30 ASPMX2.GOOGLEMAIL.com.
30 ASPMX3.GOOGLEMAIL.com.
20 alt2.aspmx.l.google.com.

[*] Scanning twitter.com for A records
104.244.42.193 - twitter.com
104.244.42.129 - twitter.com
104.244.42.129 - www.twitter.com
104.244.42.65 - www.twitter.com
104.244.42.195 - mail.twitter.com
104.244.42.195 - nike.twitter.com
104.244.42.67 - mail.twitter.com
104.244.42.195 - assets3.twitter.com
104.244.42.131 - m.twitter.com
104.244.42.2 - api.twitter.com
104.244.42.131 - mail.twitter.com
104.244.42.67 - eng.twitter.com
104.244.42.67 - analytics.twitter.com
104.244.42.3 - mail.twitter.com
104.244.42.195 - m.twitter.com
104.244.42.3 - m.twitter.com
104.244.42.67 - m.twitter.com
199.59.149.198 - www2.twitter.com
104.244.42.131 - pbs.twitter.com
104.244.42.131 - nfl.twitter.com
...
</pre>

{: .box-note}
**Note:** The reason why there are repeated subdomains is because each one points to a different IP address.

To search for AAAA records (IPv6), we just need to add the `-6` argument as indicated by the help menu. We could do other things, like a recursive subdomain scan, or TLD scanning, but these options are not covered in this post.

> This post was originally published on April 10, 2020 in my old blog.