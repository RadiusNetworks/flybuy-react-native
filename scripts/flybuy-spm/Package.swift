// swift-tools-version: 5.6
import PackageDescription

let package = Package(
    name: "FlyBuyResolver",
    dependencies: [
        .package(url: "https://github.com/RadiusNetworks/flybuy-ios", exact: "2.13.0")
    ],
    targets: [
        .target(name: "FlyBuyResolver", path: "Sources", sources: ["empty.swift"])
    ]
)
