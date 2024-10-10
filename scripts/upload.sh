#!/bin/fish

# Define the local and remote directories
LOCAL_DIR="./public/images/"
REMOTE_DIR="root@jp-spdy:/var/www/share/nsfw-commission/"

# Run rsync to synchronize the directories
rsync -avc $LOCAL_DIR $REMOTE_DIR
