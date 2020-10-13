package com.medatechuk.optimax


import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Build
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.annotation.Nullable
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import com.android.volley.RequestQueue
import com.google.android.gms.location.*


class LocationService : Service() {
    private var mFusedLocationClient: FusedLocationProviderClient? = null
    private var user:String =""
    private var requestQueueService: RequestQueue? = null

    @Nullable
    override fun onBind(intent: Intent): IBinder? {
        return null
    }
    override fun onCreate() {
        super.onCreate()
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        if (Build.VERSION.SDK_INT >= 26) {
            val CHANNEL_ID = "my_channel_01"
            val channel = NotificationChannel(
                CHANNEL_ID,
                "My Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            (getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager).createNotificationChannel(
                channel
            )
            val notification =
                NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("Optimax Location")
                    .setContentText("Optimax location is running...").build()
            startForeground(1, notification)
        }
    }

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        Log.d(TAG, "onStartCommand: called.")
        user = intent.getStringExtra("USERNAME");
        location
        return START_NOT_STICKY
    }
    // Create the location request to start receiving updates
    private val location:

            // Loop forever until thread is destroyed
            Unit
        private get() {

            // Create the location request to start receiving updates
            val mLocationRequestHighAccuracy = LocationRequest()
            mLocationRequestHighAccuracy.priority = LocationRequest.PRIORITY_HIGH_ACCURACY
            mLocationRequestHighAccuracy.interval = UPDATE_INTERVAL
            mLocationRequestHighAccuracy.fastestInterval = FASTEST_INTERVAL

            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                Log.d(
                    TAG,
                    "getLocation: stopping the location service."
                )
                stopSelf()
                return
            }
            Log.d(
                TAG,
                "getLocation: getting location information."
            )
            mFusedLocationClient!!.requestLocationUpdates(
                mLocationRequestHighAccuracy, object : LocationCallback() {
                    override fun onLocationResult(locationResult: LocationResult) {
                        Log.d(
                            TAG,
                            "onLocationResult: got location result."
                        )

                        val location = locationResult.lastLocation
                        if (location != null) {
                            uploadLocation(location)
                        }
                    }
                },
                Looper.myLooper()
            ) // Loop forever until thread is destroyed
        }



    private fun uploadLocation(location: Location) {
        val intent = Intent(this, BroadcastReceiver::class.java)
        val lng : Double = location.longitude;
        val lat : Double = location.latitude;
        val action = "${lng}#${lat}#${user}";
        intent.setAction(action);
        sendBroadcast(intent);
    }

    companion object {
        private const val TAG = "LocationService"
        private const val UPDATE_INTERVAL = 4 * 10000 /* 4 secs */.toLong()
        private const val FASTEST_INTERVAL: Long = 2000 /* 2 sec */
    }
}