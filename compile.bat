cd backend
cross +nightly update
cross +nightly build --release --target=i686-pc-windows-gnu
cd ..
echo F|xcopy /Y backend\target\i686-pc-windows-gnu\release\renegade-x-launcher.exe RenegadeX-Launcher.exe
pause