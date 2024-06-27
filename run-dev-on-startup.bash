# .vscoderc at the root of your project

# manually set this to match the port of your app or
# you can customize it to read port from a config
# curl --silent --output /dev/null localhost:<app_port> || your-run-command
curl --silent --output /dev/null localhost:3000 || npm run dev

# if nothing on port then dev will now run
# unfortunately the curl command is a bit noisy even on silent
# so when opening new VSCode terminal tabs, expect a bit of
# text when this bit gets run.