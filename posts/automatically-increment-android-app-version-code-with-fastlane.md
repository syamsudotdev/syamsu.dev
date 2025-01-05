+++
date = 2025-01-05T21:11:17
description = ""
draft = false
slug = "automatically-increment-android-app-version-code-with-fastlane"
tags = ["android", "programming", "fastlane", "automation"]
title = "Automatically Increment Android App Version Code with Fastlane"
+++

![fastlane](/images/fastlane.png)

When publishing Android apps to the Google Play Store, each release must have a higher version code than the previous one. Fastlane, the popular automation tool for app deployment, can help us manage this automatically.

Here's how to set up automatic version code incrementing using Fastlane:

1. First, we'll use Fastlane's `google_play_track_version_codes` API to fetch the latest version code from Google Play Store
2. Then, we'll increment this number and update it in our `app/build.gradle` file

Add this lane to your `fastlane/Fastfile`:

```ruby
desc "Increment version code from current Google Play Store number"
lane :increment_version_code do
  current_version_code = google_play_track_version_codes(
    track: "internal"
  )[0]

  new_version_code = current_version_code + 1
  file_name = "../app/build.gradle"
  current_content = File.read(file_name)
  new_content = current_content.gsub(/(versionCode\s[0-9]+)/, "versionCode #{new_version_code}")
  File.write(file_name, new_content)
end
```

Note that in line 4, I pass `internal` as track parameter to get my latest version code. You can change it to any supported track, which is `production`, `beta`, `alpha`, or `internal`.

Now, you can increment your version code with fastlane by issuing command below

```bash
echo "increment_version_code: detected versionCode $(cat app/build.gradle | grep -E "versionCode\s[0-9]+")"
bundle exec --gemfile ../Gemfile fastlane increment_version_code
echo "increment_version_code: app versionCode changed to $(cat app/build.gradle | grep -E "versionCode\s[0-9]+")"
```
