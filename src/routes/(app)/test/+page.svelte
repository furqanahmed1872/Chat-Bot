<head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <title>Colorful Toast Notifications</title>
</head>

<body class="flex justify-center items-center h-screen">
    <div class="space-y-4 w-full max-w-xs">
        <!-- Info Toast -->
        <div id="toast-info" class="flex items-center p-4 bg-purple-500 text-white rounded-sm shadow-lg ">
            <i class="fas fa-info-circle text-xl mr-3"></i>
            <span>This is an info toast message</span>
            <button onclick="hideToast('toast-info')" class="ml-auto text-white text-2xl font-bold">&times;</button>
        </div>

        <!-- Success Toast -->
        <div id="toast-success" class="flex items-center p-4 bg-green-500 text-white rounded-sm shadow-lg">
            <i class="fas fa-check-circle text-xl mr-3"></i>
            <span>This is a success toast message</span>
            <button onclick="hideToast('toast-success')" class="ml-auto text-white text-2xl font-bold">&times;</button>
        </div>

        <!-- Warning Toast -->
        <div id="toast-warning" class="flex items-center p-4 bg-yellow-500 text-white rounded-sm shadow-lg">
            <i class="fas fa-exclamation-circle text-xl mr-3"></i>
            <span>This is a warning toast message</span>
            <button onclick="hideToast('toast-warning')" class="ml-auto text-white text-2xl font-bold">&times;</button>
        </div>

        <!-- Danger Toast -->
        <div id="toast-danger" class="flex items-center p-4 bg-red-500 text-white rounded-sm shadow-lg">
            <i class="fas fa-times-circle text-xl mr-3"></i>
            <span>This is a danger toast message</span>
            <button onclick="hideToast('toast-danger')" class="ml-auto text-white text-2xl font-bold">&times;</button>
        </div>
    </div>

    <script>
        function hideToast(toastId) {
            document.getElementById(toastId).classList.add('hidden');
        }
    </script>
</body>
