<div id="visits-response-data" style="display: none;">
    @json([
        'success' => $success,
        'meetings' => $meetings ?? [],
        'message' => $message ?? ''
    ])
</div>

@if($success)
    <script>
        // Прокручиваем страницу назад после загрузки данных
        window.scrollTo(0, document.getElementById('visits').offsetTop);
    </script>
@endif