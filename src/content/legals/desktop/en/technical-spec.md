---
title: Technical Specification - Desktop
reportedPlatform: desktop
date: "2026-05-04"
---


About Thorium Reader Desktop Version: 3

## App Overview {#app-overview}

Purpose: Thorium is a digital book reader, it is also a library where you can store your books and access to online catalogs.

Target Audience: General public with a particular attention for heavy readers, library-goers, and students.

### Supported Operating Systems {#supported-operating-systems}

- macOS (Monterey and up)
- Windows (Windows 10 and up)
- Linux:
  - Ubuntu 18.04 and newer
  - Fedora 32 and newer
  - Debian 10 and newer

### Hardware & Software Requirements {#hardware-software-requirements}

- Both ARM 64 and AMD 64 architectures are supported via different installers.
- No additional software is needed to run Thorium Reader Desktop.

## Download, Installation, & Registration {#download-installation-registration}

### Download {#download}

Thorium Reader Desktop is available on the Windows store and can also be installed directly from the installer files available from the [Thorium website](https://thorium.edrlab.org/). A standalone (with no need to be installed) AppImage is also available for Linux, once this one downloaded, it is necessary to change permissions to make it executable as a program, then double-click on the Icon to launch the app.

### Installation {#installation}

- On Windows:
  - Select the download link corresponding to your Windows architecture (ARM 64 or AMD 64), this information is available from your system information panel.
  - Download the Thorium.Setup.3.x.x.exe file to your Windows device.
  - Open the Explorer and navigate to Downloads.
  - Double-click the downloaded *.exe file and complete the installation process. Managed devices may require admin authorization to install.

- On MacOS:
  - Select the download link corresponding to your Mac architecture (Recent M1, M2, M3, M4, M5 or Intel for Mac produced before fourth quarter of 2021), this information is available from your system information panel.
  - Download the Thorium.Setup.3.x.x.dmg file to your macOS device.
  - Open the Finder and navigate to Downloads.
  - Double-click the downloaded *.dmg file.
  - Now drag and drop the application icon to the Applications folder to install the application.
  - Close the window and press the eject button in Finder to dismount the image.

- On Linux:
  - Select the download link corresponding to your computer architecture (ARM 64 or AMD 64), this information is available from your system information panel.
  - Download the Thorium.Setup.3.x.x.deb file to your Linux device.
  - Open the file manager and navigate to Downloads.
  - Double-click the downloaded *.deb file and complete the installation process. Managed devices may require admin authorization to install.

### Accounts & passphrases {#accounts-passphrases}

- No account nor registration are necessary to use Thorium Reader Desktop.
- An account is necessary to access catalogs loaded into Thorium. In that case, the catalog provider is responsible for any related question, support or reclamation.
- A passphrase can be necessary to read protected ebooks. This passphrase is stored by the application after being entered once, and is therefore requested once only. The provider of the protected ebook is responsible for any related question, support or reclamation. Since version 3.4.0, the LCP passphrase input text field can show unmasked clear text.

## Supported publication formats {#supported-publication-formats}

- EPUB (Electronic PUBlication), version 2 and 3 including Reflowable, Fixed-Layout and MediaOverlay variants.
- Web Publications both in their W3C and Readium flavors.
- DAISY, version 2.02 and 3, both in their text only, audio only, and synchronized text and audio flavors.
- PDF without support for forms nor annotations.
- Audiobooks standardized as per W3C packaged (LPF) audiobook format.
- Divina, an experimental format for comics, manga, webtoons and other styles of digital works based on sequences of images.

## App features {#app-features}

- **Load & Read ebooks**: Thorium Reader Desktop allows you to load an ebook from your computer and read it in a dedicated window.
- **Organize ebooks**: ebooks can be sorted, tagged, exported, deleted and lending can be managed from the Library window. Since version 3.4.0, users can filter and sort directly in the publication grid view mode of the library window, in addition to the existing table view functionality.
- **Bookmark**: Users can add, comment, tag, modify, sort, access, export and import bookmarks.
- **Annotate**: Users can add, personalize (with color and stroke), comment, tag, modify, sort, access, export and import annotations. **Note:** Since version 3.4.0, annotations and notes are stored exclusively in SQLite for improved performance and reliability.
- **Filter**: Users can filter ebooks with a range of options, including free text (like search).
- **Search**: Users can search inside an ebook, list and navigate between search results.
- **Export to HTML**: Since version 3.4.0, users can export ebook content to HTML format using a keyboard shortcut.
- **Add & Browse catalogs**: Users can add catalogs in the OPDS format and browse them depending on the options provided by the catalog provider. Since version 3.4.0, users can sort favorite OPDS feeds.
- **Lend & acquire ebooks**: Users can download ebooks from catalogs for a timeless access or under a time period depending on the catalog provider terms of lending or acquisition.
- **Personalize**: Users can personalize the reading experience according to the formats capacities.
- **Accessibility**: Users can use assistive technology to access and use Thorium Reader Desktop.
- **User guide**: Users can download, read online or load as catalog a complete user guide as ebook.
- **Offline support**: Thorium Reader Desktop can be used offline, however, online catalogs can not be accessed offline.

## Security Information {#security-information}

### Security Reports {#security-reports}

Security vulnerabilities must be reported privately to maintainers through the dedicated [report a vulnerability page](https://github.com/edrlab/thorium-reader/security/advisories/new). A GitHub account is necessary. Alternatively, vulnerability reports can be sent by email at: [contact@edrlab.org](mailto:contact@edrlab.org).

For Higher Education needs, we maintain an online [Higher Education Community Vendor Assessment Toolkit (google sheet)](https://docs.google.com/spreadsheets/d/1SDya5FGF1eakmwu_dSnqeeBqJLBFohGa/edit?usp=sharing&ouid=105423198055318923834&rtpof=true&sd=true) 

ISO 27001 certifications, SOC 2 Type II reports, or similar assurances apply to the information‑security management and services operated by content providers, not to the Thorium Reader desktop application itself.

### Supply Chain Security {#supply-chain-security}

We use [Socket.dev](https://socket.dev/) to monitor and analyze our dependencies for security vulnerabilities and supply chain risks, helping ensure the integrity of our codebase and protecting against dependency-related security threats.

### Data protection {#data-protection}

Thorium Reader Desktop collects no personal data

### Permissions {#permissions}

Thorium Reader Desktop requires device access to the following:

- File system access - Required for downloading digital content (e.g. books) and storing annotations.
- Network access - Necessary for connecting third party catalogs and downloading digital content from those.

### Network Communications {#network-communications}

Thorium Reader Desktop works entirely offline by default. If network access is available, it uses only HTTP and HTTPS protocols, typically over ports 80 and 443, for these specific functions:

- `HTTP POST https://telemetry.edrlab.org/` — Sends anonymized telemetry data (a timestamp, the version of Thorium Reader, the operating system of the device and its version, the locale of the application at the time it is started, if this is the first start of Thorium Reader after a fresh install).
- `HTTP GET https://raw.githubusercontent.com/edrlab/thorium-reader/master/latest.json` — Checks if a new version of Thorium Reader is available.

When users add third-party catalogs (such as OPDS feeds), Thorium Reader may connect using HTTP or HTTPS with GET, POST, or PUT requests. These catalogs may use ports other than 80 and 443, depending on their configuration.

Thorium Reader Desktop does not use SSH, direct TCP connections, or WebSockets for any communication.

## Troubleshooting {#troubleshooting}

- **User guide**: is available in English, French and Spanish, as an ebook to Download or read online. The [complete user guide catalog](opds://edrlab.github.io/publications/feeds/thorium32_documentation.json) can be added to Thorium Reader. as EPUB, different translations are available through the Thorium documentation catalog.
- **Support**: the webpage contains [support](https://thorium.edrlab.org/en/th3/) information in English, French and Spanish.
- **Help Desk**: comprehensive help and frequently asked questions are available at the [Thorium Reader Help Desk](https://support.thoriumreader.com/).
- **Known/Common issues**: are available publicly from our [Issue tracker](https://github.com/edrlab/thorium-reader-doc/issues/new)
- **Error Reports**: errors and problems should preferably be reported via our [support tracking tool](https://github.com/edrlab/thorium-reader-doc/issues/new) (require a free GitHub account) or [contact form](https://www.edrlab.org/contact/).

## Version {#version}

Current Version: 3

### Version File Sizes {#version-file-sizes}

- Windows AMD .exe: 113 MB
- Windows ARM .exe: 120 MB
- MacOS AMD .dmg: 139 MB
- MacOS ARM .dmg: 131 MB
- Linux AMD .deb: 105 MB
- Linux ARM .deb: 99.3 MB
- Linux AMD .app: 137 MB
- Linux ARM .app: 137 MB

### Major third-party dependencies {#technical-dependencies}

Thorium makes notable use of 
- Electron v41
- Chromium v146
- NodeJS v24

### Release Notes {#release-notes}

Full release notes are available from the [code repository release page](https://github.com/edrlab/thorium-reader/releases/tag/v3.4.0)

## Legal Information {#legal-information}

EDRLab is the owner of the Application, including all copyrights, trademarks, trade names, logos, patents, trade secrets and other intellectual property rights relating thereto. EDRLab may license third parties for the use or operation of the Application.

For complete and up to date Terms of use, please see the [Terms of Use](terms-of-use/) page.
