+++
date = 2024-12-31T07:11:17
description = ""
draft = false
slug = "watch-out-for-duplicate-view-id-to-attach-android-fragment"
tags = ["android", "programming"]
title = "Watch Out for Duplicate View ID to Attach Android Fragment"
+++

When developing new screens on an android app, I almost always isolate them by creating a full screen fragment. And then attach that fragment on a internal android app activity; which is an activity visible only on developer build. This way I can focus to iterate isolated from existing code. The last task will be integrating existing activities and/or fragments with the new fragment I wrote.

That one time, I had done my work with an android fragment using said activity. Attaching the fragment to existing activity should be easiest part of all. But not this particular activity, my fragment was not showing at all. Break points, logs, fragment manager's state, they were all there, indicating the fragment is alive on activity. But where is it?

After I had done messing with the activity, had pairing session with a colleague, we spun up the android [layout inspector](https://developer.android.com/studio/debug/layout-inspector), checking the views' hierarchy closely, it turned out there were 2 views with the same IDs, which I used to attach my fragment.

So, folks, watch out for duplicate view ID when attaching your android fragments.
